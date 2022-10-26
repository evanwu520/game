package core

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"sync"
	"time"

	"github.com/shopspring/decimal"
)

// TODO handle all user

type UserInfo struct {
	Name    string          `json:"name"`
	Balance decimal.Decimal `json:"balance"`
	Lock    sync.RWMutex    `json:"-"`
}

type player struct{}

var oncePlayer sync.Once

var playerInstance *player

func GetPlayerInstance() *player {

	oncePlayer.Do(func() {
		playerInstance = &player{}
	})
	return playerInstance
}

func (*player) GeneGuest() *UserInfo {

	info := &UserInfo{}

	rand.Seed(time.Now().UnixNano())
	max := 999999999
	min := 1
	v := rand.Intn(max-min) + min

	info.Name = fmt.Sprintf("%09d", v)
	info.Balance = decimal.NewFromInt(1000)

	return info

}

type gamePlayer struct {
	Cmd        string    `json:"cmd"`
	PlayerInfo *UserInfo `json:"user_info"`
}

func (*player) PlayerDataFormat(info *UserInfo) []byte {

	resp := &gamePlayer{}
	resp.Cmd = gamePlayerInfoCmd
	resp.PlayerInfo = info

	dataByte, _ := json.Marshal(resp)

	return dataByte

}
