package core

import (
	"encoding/json"
	"fmt"
	"game/core/game"
	"game/core/game_dice"
	"sync"
)

func init() {

}

var once sync.Once

type gameManager struct {
	rooms           map[string]*game.RoomSetting
	lock            sync.RWMutex
	roomsStatus     map[string]*game.RoomStatus
	roomsStatusLock sync.RWMutex
}

var instance *gameManager

func GetGameInstance() *gameManager {

	once.Do(func() {
		instance = &gameManager{}
		instance.rooms = make(map[string]*game.RoomSetting)
		instance.roomsStatus = make(map[string]*game.RoomStatus)
	})
	return instance
}

func (g *gameManager) NewRoom(roomId string) {

	g.lock.Lock()
	defer g.lock.Unlock()

	if _, exist := g.rooms[roomId]; exist {
		return
	}

	// TODO  judge game type for instance
	room := &game.RoomSetting{}
	room.RoomId = roomId

	room.Step = game.GetBankerStep()

	g.rooms[roomId] = room

	status := &game.RoomStatus{}
	status.RoomId = roomId
	status.Stop = make(chan bool)
	status.Start = make(chan bool)
	g.roomsStatus[roomId] = status

	// TODO judge game type
	game_dice.GetGameBetInstance()
	game_dice.GetGameInstance().NewRoom(room, status)

	roomObj := allRoom{}
	roomObj.Cmd = game.GameRoomCmd

	// TODO
	for v := range g.rooms {
		roomObj.Rooms = append(roomObj.Rooms, v)
	}

	byteData, _ := json.Marshal(roomObj)
	game.GameBroadcast <- byteData

}

type allRoom struct {
	Cmd   string   `json:"cmd"`
	Rooms []string `json:"rooms"`
}

// TODO
func (g *gameManager) Stop(roomId string) {

	go func(roomId string) {
		g.roomsStatusLock.Lock()
		defer g.roomsStatusLock.Unlock()

		if v, exist := g.roomsStatus[roomId]; exist {

			if v.Action != game.Stop {
				v.Stop <- true
			}
		}
	}(roomId)
}

// TODO
func (g *gameManager) Start(roomId string) {

	go func(roomId string) {
		g.roomsStatusLock.Lock()
		defer g.roomsStatusLock.Unlock()

		if v, exist := g.roomsStatus[roomId]; exist {
			if v.Action == game.Stop {
				v.Start <- true
			}
		}

	}(roomId)

}

func (g *gameManager) GetAllRoomStatus() map[string]*game.RoomStatus {

	g.roomsStatusLock.RLock()
	defer g.roomsStatusLock.RUnlock()

	return g.roomsStatus
}

func (g *gameManager) GetRoomStatus(roomId string) *game.RoomStatus {

	g.roomsStatusLock.Lock()
	defer g.roomsStatusLock.Unlock()

	return g.roomsStatus[roomId]
}

type listRoomsResp struct {
	Cmd      string             `json:"cmd"`
	RoomList []*game.RoomStatus `json:"room_list"`
}

func (g *gameManager) ListRooms() []byte {

	g.roomsStatusLock.RLock()
	defer g.roomsStatusLock.RUnlock()

	resp := listRoomsResp{}
	resp.Cmd = game.GameRoomList

	for _, v := range GetGameInstance().roomsStatus {
		resp.RoomList = append(resp.RoomList, v)
	}

	dataByte, err := json.Marshal(resp)

	//  TODO
	if err != nil {
		fmt.Println(err.Error())
	}

	return dataByte
}
