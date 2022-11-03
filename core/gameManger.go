package core

import (
	"encoding/json"
	"game/core/game"
	"game/core/game_dice"
	"sync"
)

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

	// TODO  judge game type for instance
	room := &game.RoomSetting{}
	room.RoomId = roomId
	room.Stop = make(chan bool)
	room.Start = make(chan bool)

	g.rooms[roomId] = room

	status := &game.RoomStatus{}
	status.RoomId = roomId
	g.roomsStatus[roomId] = status

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

	dataByte, _ := json.Marshal(resp)

	return dataByte
}
