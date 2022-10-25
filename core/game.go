package core

import (
	"encoding/json"
	"sync"
	"time"
)

var GameBroadcast chan []byte = make(chan []byte)

var once sync.Once

type gameManager struct {
	rooms map[string]*roomSetting
	lock  sync.RWMutex
}

var instance *gameManager

func GetGameInstance() *gameManager {

	once.Do(func() {
		instance = &gameManager{}
		instance.rooms = make(map[string]*roomSetting)
	})
	return instance
}

func (g *gameManager) getStep() []*Stage {

	var stages []*Stage

	stages = append(stages, &Stage{Action: startBet, WaitTime: 5})
	stages = append(stages, &Stage{Action: countDown, WaitTime: 3})
	stages = append(stages, &Stage{Action: stopBet, WaitTime: 1})
	stages = append(stages, &Stage{Action: result, WaitTime: 3})

	return stages
}

type roomSetting struct {
	RoomId string
	Step   []*Stage
	Stop   chan bool
	Start  chan bool
	Action action
}

type action string

const (
	startBet  action = "start_bet"
	countDown action = "count_down"
	stopBet   action = "stop_bet"
	result    action = "result"
	stop      action = "stop"
)

type Stage struct {
	Action   action
	WaitTime time.Duration
}

func (g *gameManager) NewRoom(roomId string) {

	room := &roomSetting{}
	room.RoomId = roomId
	room.Step = g.getStep()
	room.Stop = make(chan bool)
	room.Start = make(chan bool)

	g.lock.Lock()
	defer g.lock.Unlock()
	g.rooms[roomId] = room

	g.Run(room)

	roomObj := allRoom{}
	roomObj.Cmd = gameRoomCmd

	for v, _ := range g.rooms {
		roomObj.Rooms = append(roomObj.Rooms, v)
	}

	byteData, _ := json.Marshal(roomObj)
	GameBroadcast <- byteData

}

type allRoom struct {
	Cmd   string   `json:"cmd"`
	Rooms []string `json:"rooms"`
}

const (
	gameStateCmd = "game_state"
	gameRoomCmd  = "game_room"
)

type roomActionResp struct {
	Cmd      string        `json:"cmd"`
	RoomName string        `json:"room_name"`
	Action   action        `json:"action"`
	Second   time.Duration `json:"second"`
}

func (g *gameManager) Run(setting *roomSetting) {

	go func(setting *roomSetting) {

		for {

			select {
			case v, _ := <-setting.Stop:

				if v {

					setting.Action = stop

					data := roomActionResp{}
					data.Cmd = gameStateCmd
					data.RoomName = setting.RoomId
					data.Action = stop

					// fmt.Println(setting.RoomId + "stop")

					byteData, _ := json.Marshal(data)
					GameBroadcast <- byteData

					<-setting.Start
				}

			default:
				for _, v := range setting.Step {

					setting.Action = v.Action
					data := roomActionResp{}
					data.Cmd = gameStateCmd
					data.RoomName = setting.RoomId
					data.Action = v.Action

					if v.Action == startBet || v.Action == countDown {
						data.Second = v.WaitTime
					}

					byteData, _ := json.Marshal(data)
					GameBroadcast <- byteData

					// GameBroadcast <- []byte(fmt.Sprintf("room:%v %v", setting.RoomId, v.Action))

					time.Sleep(v.WaitTime * time.Second)
				}
			}
		}

	}(setting)
}

func (g *gameManager) Stop(roomId string) {

	g.lock.Lock()
	defer g.lock.Unlock()

	if v, exist := g.rooms[roomId]; exist {

		v.Stop <- true
	}
}

func (g *gameManager) Start(roomId string) {

	g.lock.Lock()
	defer g.lock.Unlock()

	if v, exist := g.rooms[roomId]; exist {

		v.Start <- true
	}
}
