package player

import (
	"encoding/json"
	"fmt"
	"game/core/game"
	"math/rand"
	"sync"
	"time"

	"github.com/shopspring/decimal"
)

// TODO handle all user

type UserInfo struct {
	Name    string          `json:"name"`
	balance decimal.Decimal `json:"balance"`
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
	info.AddBalance(decimal.NewFromInt(1000))

	return info

}

type gamePlayer struct {
	Cmd      string          `json:"cmd"`
	UserName string          `json:"user_name"`
	Balance  decimal.Decimal `json:"balance"`
	// RoomList []*game.RoomStatus `json:"room_list"`
}

func (*player) PlayerDataFormat(info *UserInfo) []byte {

	resp := &gamePlayer{}
	resp.Cmd = game.GamePlayerInfoCmd
	resp.UserName = info.Name
	resp.Balance = info.balance

	// for _, v := range core.GetGameInstance().GetAllRoomStatus() {
	// 	resp.RoomList = append(resp.RoomList, v)
	// }

	dataByte, _ := json.Marshal(resp)

	return dataByte

}

func (u *UserInfo) AddBalance(amount decimal.Decimal) decimal.Decimal {
	u.Lock.Lock()
	defer u.Lock.Unlock()
	u.balance = u.balance.Add(amount)
	return u.balance
}

func (u *UserInfo) SubBalance(amount decimal.Decimal) decimal.Decimal {
	u.Lock.Lock()
	defer u.Lock.Unlock()
	u.balance = u.balance.Sub(amount)
	return u.balance
}

func (u *UserInfo) GetBalance() decimal.Decimal {
	u.Lock.Lock()
	defer u.Lock.Unlock()
	return u.balance
}
