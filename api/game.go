package api

import (
	"fmt"
	"game/core/player"
	"net/http"
)

type gameApi struct{}

func NewGameApi() *gameApi {
	return &gameApi{}
}

func (*gameApi) GuestLogin(w http.ResponseWriter, r *http.Request) {

	token := player.GetPlayerInstance().GuestLoging()

	w.Write([]byte(token))
}

func (*gameApi) Bet(w http.ResponseWriter, r *http.Request) {
	user := r.Context().Value(TokenTag).(*player.UserInfo)

	fmt.Println(user)
}
