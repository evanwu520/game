package player

import (
	"crypto/md5"
	"encoding/json"
	"fmt"
	"game/core/game"
	"math/rand"
	"sync"
	"time"

	"github.com/shopspring/decimal"
)

type player struct {
	playerMap map[string]*UserInfo
	lock      sync.RWMutex
}

type UserInfo struct {
	Name    string          `json:"name"`
	balance decimal.Decimal `json:"balance"`
	Lock    sync.RWMutex    `json:"-"`
}

var oncePlayer sync.Once

var playerInstance *player

func GetPlayerInstance() *player {

	oncePlayer.Do(func() {
		playerInstance = &player{}
		playerInstance.playerMap = make(map[string]*UserInfo) // key token
	})
	return playerInstance
}

func (p *player) AddPlayer(key string, user *UserInfo) {

	p.lock.Lock()
	defer p.lock.Unlock()
	p.playerMap[key] = user
}

func (p *player) GetPlayer(key string) *UserInfo {

	p.lock.Lock()
	defer p.lock.Unlock()

	return p.playerMap[key]
}

func (p *player) DelPlayer(key string) {

	p.lock.Lock()
	defer p.lock.Unlock()

	delete(p.playerMap, key)
}

func (p *player) GuestLoging() string {

	info := &UserInfo{}

	rand.Seed(time.Now().UnixNano())
	max := 999999999
	min := 1
	v := rand.Intn(max-min) + min

	info.Name = fmt.Sprintf("%09d", v)
	info.AddBalance(decimal.NewFromInt(1000))

	data := []byte(info.Name)
	has := md5.Sum(data)
	md5str1 := fmt.Sprintf("%x", has)

	p.AddPlayer(md5str1, info)

	return md5str1
}

// // TODO remove for websocket
// func (*player) GeneGuest() *UserInfo {

// 	info := &UserInfo{}

// 	rand.Seed(time.Now().UnixNano())
// 	max := 999999999
// 	min := 1
// 	v := rand.Intn(max-min) + min

// 	info.Name = fmt.Sprintf("%09d", v)
// 	info.AddBalance(decimal.NewFromInt(1000))

// 	return info
// }

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
