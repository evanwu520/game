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

var GameBroadcast chan []byte = make(chan []byte)
var ResultBrocast chan ResultBrocastInfo = make(chan ResultBrocastInfo)

type ResultBrocastInfo struct {
	UserName   string
	ResultInfo []byte
}

type RoomSetting struct {
	RoomId string
	Step   []*Stage
	Stop   chan bool
	Start  chan bool
	Action Action
}

type Action string

type Stage struct {
	Action   Action
	WaitTime time.Duration
}

type RoomStatus struct {
	RoomId string       `json:"room_id"`
	Action Action       `json:"action"`
	Status interface{}  `json:"status"`
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
