package core

import (
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

func (*gameBet) Bet(info *UserInfo, roomId string) (string, bool) {

	info.Lock.Lock()
	defer info.Lock.Unlock()

	betAmount := decimal.NewFromInt(300)

	if room, exist := GetGameInstance().rooms[roomId]; exist {

		if info.Balance.LessThanOrEqual(decimal.NewFromInt(0)) || info.Balance.LessThan(betAmount) {
			return fmt.Sprintf("%s balance is not enough !", info.Name), false
		}

		if room.Action == start || room.Action == countDown {
			info.Balance = info.Balance.Sub(betAmount)
			return fmt.Sprintf("%s bet %v success !", info.Name, betAmount), true
		}

	}

	return fmt.Sprintf("%s bet %v failed !", info.Name, betAmount), false
}
