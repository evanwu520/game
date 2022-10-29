package core

import (
	"encoding/json"
	"math/rand"
	"sync"
	"time"
)

var GameBroadcast chan []byte = make(chan []byte)

var ResultBrocast chan resultBrocastInfo = make(chan resultBrocastInfo)

type resultBrocastInfo struct {
	UserName   string
	ResultInfo []byte
}

var once sync.Once

type gameManager struct {
	rooms map[string]*roomSetting
	lock  sync.RWMutex
}

type roomStep struct {
	RoomId string `json:"room_id"`
	Action action `json:"action"`
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

	stages = append(stages, &Stage{Action: startBet, WaitTime: 12})
	stages = append(stages, &Stage{Action: countDown, WaitTime: 5})
	stages = append(stages, &Stage{Action: stopBet, WaitTime: 1})
	stages = append(stages, &Stage{Action: result, WaitTime: 4})

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

	for v := range g.rooms {
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
	gamePlayerInfoCmd = "game_player_info"
	gameStateCmd      = "game_state"
	gameRoomCmd       = "game_room"
	gameResultCmd     = "game_result"
)

type roomActionResp struct {
	Cmd      string      `json:"cmd"`
	RoomName string      `json:"room_name"`
	Action   action      `json:"action"`
	Data     interface{} `json:"data"`
}

func (g *gameManager) Run(setting *roomSetting) {

	go func(setting *roomSetting, betManager *betRecordManager) {

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

					var m map[string]interface{}

					var results []*settleWinInfo

					switch v.Action {

					case startBet, countDown:
						m = make(map[string]interface{})
						m["seconds"] = v.WaitTime
					case result:
						// TODO
						m = make(map[string]interface{})
						pointMap := make(map[string]int)
						pointMap["1"] = g.diceRandom()
						pointMap["2"] = g.diceRandom()
						m["point"] = pointMap

						var winArea int

						if pointMap["1"] > pointMap["2"] {

							winArea = 1
						} else if pointMap["1"] < pointMap["2"] {
							winArea = 2
						} else {
							winArea = 3
						}
						m["win_area"] = winArea

						//  結算注單
						results = betManager.Settle(winArea)
					default:

					}

					data.Data = m
					byteData, _ := json.Marshal(data)

					// all user
					GameBroadcast <- byteData

					if len(results) > 0 {

						// brocast result to  user
						for _, v := range results {
							resultBrocst := resultBrocastInfo{}
							resultBrocst.UserName = v.UserName
							byteData, _ := json.Marshal(v)
							resultBrocst.ResultInfo = byteData

							go func(result resultBrocastInfo) {

								ResultBrocast <- result
							}(resultBrocst)
						}

					}

					m = nil

					time.Sleep(v.WaitTime * time.Second)
				}
			}
		}

	}(setting, CreateOrGetRoomBetRecordManger(setting.RoomId))
}

func (g *gameManager) diceRandom() int {
	min := 1
	max := 6

	s1 := rand.NewSource(time.Now().UnixNano() + int64(rand.Intn(1000)))
	r1 := rand.New(s1)

	return r1.Intn(max-min) + min
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
