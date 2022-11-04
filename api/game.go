package api

import (
	"encoding/json"
	"fmt"
	"game/core"
	"game/core/player"
	"io/ioutil"
	"net/http"

	"github.com/shopspring/decimal"
)

type gameApi struct{}

func NewGameApi() *gameApi {
	return &gameApi{}
}

func (*gameApi) GuestLogin(w http.ResponseWriter, r *http.Request) {

	token := player.GetPlayerInstance().GuestLoging()

	w.Write([]byte(token))
}

type BetReq struct {
	RoomId string          `json:"room_id"`
	Area   int             `json:"area"`
	Amount decimal.Decimal `json:"amount"`
}

func (*gameApi) Bet(w http.ResponseWriter, r *http.Request) {
	user := r.Context().Value(TokenTag).(*player.UserInfo)

	body, err := ioutil.ReadAll(r.Body)
	bodyString := string(body)
	fmt.Println(bodyString)

	// Unmarshal result
	betInfo := &BetReq{}
	err = json.Unmarshal(body, betInfo)

	if err != nil {
		fmt.Println("Reading body failed: ", err)
		return
	}

	data := core.GetGameBetInstance().BetApi(user, betInfo)

	w.Write(data)
}
