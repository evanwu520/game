package core

import (
	"fmt"
	"sync"
	"time"
)

var Broadcast chan []byte = make(chan []byte)

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

	stages = append(stages, &Stage{Action: "start", WaitTime: 5})
	stages = append(stages, &Stage{Action: "count down", WaitTime: 3})
	stages = append(stages, &Stage{Action: "stop", WaitTime: 1})
	stages = append(stages, &Stage{Action: "result", WaitTime: 3})

	return stages
}

type roomSetting struct {
	RoomId string
	Step   []*Stage
	Stop   chan bool
	Start  chan bool
	Action string
}

type Stage struct {
	Action   string
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

}

func (g *gameManager) Run(setting *roomSetting) {

	go func(setting *roomSetting) {

		for {

			select {
			case v, _ := <-setting.Stop:

				if v {
					fmt.Println(setting.RoomId + "stop")

					<-setting.Start
				}

			default:
				for _, v := range setting.Step {

					setting.Action = v.Action

					Broadcast <- []byte(fmt.Sprintf("gameId:%v %v", setting.RoomId, v.Action))

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
