package api

import (
	"game/core"
	"net/http"
)

type gameManager struct{}

func NewGameManager() *gameManager {
	return &gameManager{}
}

func (*gameManager) NewRoom(w http.ResponseWriter, r *http.Request) {
	roomId := r.URL.Query().Get("roomId")
	core.GetGameInstance().NewRoom(roomId)
}

func (*gameManager) Stop(w http.ResponseWriter, r *http.Request) {
	roomId := r.URL.Query().Get("roomId")
	core.GetGameInstance().Stop(roomId)
}

func (*gameManager) Start(w http.ResponseWriter, r *http.Request) {
	roomId := r.URL.Query().Get("roomId")
	core.GetGameInstance().Start(roomId)
}
