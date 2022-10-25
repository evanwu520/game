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

type betResponse struct {
	Cmd          string          `json:"cmd"`
	BetInfo      *betInfo        `json:"bet_info"`
	Balnace      decimal.Decimal `json:"balance"`
	ErrorMessage string          `json:"error_message"`
}

// TODO response data
func (*gameBet) Bet(info *UserInfo, v interface{}, cmd string) []byte {

	bet := &betInfo{}

	byte, _ := json.Marshal(v)
	json.Unmarshal(byte, bet)

	info.Lock.Lock()
	defer info.Lock.Unlock()

	betAmount := bet.Amount

	resp := &betResponse{}
	resp.Cmd = cmd
	resp.BetInfo = bet
	resp.Balnace = info.Balance

	if room, exist := GetGameInstance().rooms[bet.RoomId]; exist {

		if info.Balance.LessThanOrEqual(decimal.NewFromInt(0)) || info.Balance.LessThan(betAmount) {

			// return fmt.Sprintf("%s balance is not enough !", info.Name), false

			resp.ErrorMessage = fmt.Sprintf("%s balance is not enough !", info.Name)
			data, _ := json.Marshal(resp)

			return data
		}

		if room.Action == start || room.Action == countDown {
			info.Balance = info.Balance.Sub(betAmount)
			resp.Balnace = info.Balance
			// return fmt.Sprintf("%s bet %v success ! , balance:%v", info.Name, betAmount, info.Balance), true

			data, _ := json.Marshal(resp)

			return data
		}
	}

	resp.ErrorMessage = fmt.Sprintf("%s bet %v failed !", info.Name, betAmount)
	data, _ := json.Marshal(resp)

	return data
}
