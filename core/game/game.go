package game

import (
	"sync"
	"time"
)

const (
	GameRoomList      = "game_room_list"
	GamePlayerInfoCmd = "game_player_info"
	GameStateCmd      = "game_state"
	GameRoomCmd       = "game_room"
	GameResultCmd     = "game_result"
)

const (
	StartBet  Action = "start_bet"
	CountDown Action = "count_down"
	StopBet   Action = "stop_bet"
	Result    Action = "result"
	Stop      Action = "stop"
)

var GameBroadcast chan []byte = make(chan []byte)
var ResultBrocast chan ResultBrocastInfo = make(chan ResultBrocastInfo)

type ResultBrocastInfo struct {
	UserName   string
	ResultInfo []byte
}

type RoomSetting struct {
	RoomId string
	Step   []*Stage
	Action Action
}

type Action string

type Stage struct {
	Action   Action
	WaitTime time.Duration
}

func GetBankerStep() []*Stage {

	var stages []*Stage

	stages = append(stages, &Stage{Action: StartBet, WaitTime: 12})
	stages = append(stages, &Stage{Action: StopBet, WaitTime: 1})
	stages = append(stages, &Stage{Action: Result, WaitTime: 4})

	return stages
}

type RoomStatus struct {
	RoomId string       `json:"room_id"`
	Action Action       `json:"action"`
	Status interface{}  `json:"status"`
	Stop   chan bool    `json:"-"`
	Start  chan bool    `json:"-"`
	lock   sync.RWMutex `json:"-"`
}

func (r *RoomStatus) ChangeRoomStatus(step Action, status interface{}) {

	r.lock.Lock()
	defer r.lock.Unlock()

	r.Action = step
	r.Status = status
}

type RoomActionResp struct {
	Cmd      string      `json:"cmd"`
	RoomName string      `json:"room_name"`
	Action   Action      `json:"action"`
	Data     interface{} `json:"data"`
}
