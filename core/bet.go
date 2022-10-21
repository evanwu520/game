package core

import (
	"encoding/json"
	"fmt"
	"sync"

	"github.com/shopspring/decimal"
)

type gameBet struct{}

var onceGameBet sync.Once

var gameBetInstance *gameBet

func GetGameBetInstance() *gameBet {

	onceGameBet.Do(func() {
		gameBetInstance = &gameBet{}
	})
	return gameBetInstance
}

type betInfo struct {
	RoomId string          `json:"room_id"`
	Area   int             `json:"area"`
	Amount decimal.Decimal `json:"amount"`
}

// TODO response data
func (*gameBet) Bet(info *UserInfo, v interface{}) (string, bool) {

	bet := &betInfo{}

	byte, _ := json.Marshal(v)
	json.Unmarshal(byte, bet)

	info.Lock.Lock()
	defer info.Lock.Unlock()

	betAmount := bet.Amount

	if room, exist := GetGameInstance().rooms[bet.RoomId]; exist {

		if info.Balance.LessThanOrEqual(decimal.NewFromInt(0)) || info.Balance.LessThan(betAmount) {
			return fmt.Sprintf("%s balance is not enough !", info.Name), false
		}

		if room.Action == start || room.Action == countDown {
			info.Balance = info.Balance.Sub(betAmount)
			return fmt.Sprintf("%s bet %v success ! , balance:%v", info.Name, betAmount, info.Balance), true
		}

	}

	return fmt.Sprintf("%s bet %v failed !", info.Name, betAmount), false
}
