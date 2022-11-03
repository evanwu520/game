package game_dice

import (
	"encoding/json"
	"fmt"
	"game/core/game"
	"game/core/player"
	"sync"

	"github.com/shopspring/decimal"
)

type gameBet struct {
}

var roomBetManager = struct {
	betMap map[string]*betRecordManager
	lock   sync.RWMutex
}{}

var onceGameBet sync.Once

var gameBetInstance *gameBet

func GetGameBetInstance() *gameBet {
	onceGameBet.Do(func() {
		gameBetInstance = &gameBet{}
		roomBetManager.betMap = make(map[string]*betRecordManager)

	})
	return gameBetInstance
}

type betRecordManager struct {
	reocrd []betRecord
	lock   sync.RWMutex
}

type betRecord struct {
	RoomId   string           `json:"room_id"`
	Area     int              `json:"area"`
	Amount   decimal.Decimal  `json:"amount"`
	UserInfo *player.UserInfo `json:"user_info"`
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

func (g *gameBet) Bet(rooms map[string]*game.RoomSetting, info *player.UserInfo, v interface{}, cmd string) []byte {

	bet := &betInfo{}

	byte, _ := json.Marshal(v)
	json.Unmarshal(byte, bet)

	betAmount := bet.Amount

	resp := &betResponse{}
	resp.Cmd = cmd
	resp.BetInfo = bet
	resp.Balnace = info.GetBalance()

	if room, exist := rooms[bet.RoomId]; exist {

		if info.GetBalance().LessThanOrEqual(decimal.NewFromInt(0)) || info.GetBalance().LessThan(betAmount) {

			resp.ErrorMessage = fmt.Sprintf("%s balance is not enough !", info.Name)
			data, _ := json.Marshal(resp)

			return data
		}

		if room.Action == startBet || room.Action == countDown {

			resp.Balnace = info.SubBalance(betAmount)
			data, _ := json.Marshal(resp)

			// TODO define area and verify
			record := betRecord{}
			record.UserInfo = info
			record.RoomId = bet.RoomId
			record.Area = bet.Area
			record.Amount = betAmount

			CreateOrGetRoomBetRecordManger(record.RoomId).AddRecord(record)

			return data
		}

	}

	resp.ErrorMessage = fmt.Sprintf("%s bet %v failed !", info.Name, betAmount)
	data, _ := json.Marshal(resp)

	return data

}

func CreateOrGetRoomBetRecordManger(roomId string) *betRecordManager {
	roomBetManager.lock.Lock()
	defer roomBetManager.lock.Unlock()

	if _, exist := roomBetManager.betMap[roomId]; !exist {
		roomBetManager.betMap[roomId] = &betRecordManager{}
	}

	return roomBetManager.betMap[roomId]
}

func (m *betRecordManager) AddRecord(record betRecord) {

	m.lock.Lock()
	defer m.lock.Unlock()

	m.reocrd = append(m.reocrd, record)
}

type settleWinInfo struct {
	Cmd       game.Action     `json:"cmd"`
	UserName  string          `json:"user_name"`
	RoomId    string          `json:"room_id"`
	WinAmount decimal.Decimal `json:"win_amount"`
	Balance   decimal.Decimal `json:"balance"`
}

func (m *betRecordManager) Settle(area int) []*settleWinInfo {

	m.lock.Lock()
	defer m.lock.Unlock()

	userSummary := make(map[string]*settleWinInfo)
	userMap := make(map[string]*player.UserInfo)

	var winResult []*settleWinInfo

	for _, bet := range m.reocrd {

		winInfo := &settleWinInfo{}
		winInfo.Cmd = game.GameResultCmd
		winInfo.UserName = bet.UserInfo.Name
		winInfo.RoomId = bet.RoomId

		// TODO
		if bet.Area == area {
			// win
			fmt.Println(bet.RoomId, bet.UserInfo.Name, bet.Area, area, "win")

			if area == 3 {
				winInfo.WinAmount = bet.Amount.Mul(decimal.NewFromInt(2))
			} else {
				winInfo.WinAmount = bet.Amount
			}

			winInfo.Balance = bet.UserInfo.AddBalance(bet.Amount.Add(winInfo.WinAmount))

		} else {
			// lose
			fmt.Println(bet.RoomId, bet.UserInfo.Name, bet.Area, area, "lose")
			winInfo.WinAmount = bet.Amount.Mul(decimal.NewFromInt(-1))
			winInfo.Balance = bet.UserInfo.GetBalance()
		}

		if _, exist := userSummary[bet.UserInfo.Name]; !exist {
			userSummary[bet.UserInfo.Name] = winInfo
			userMap[bet.UserInfo.Name] = bet.UserInfo
		} else {
			userSummary[bet.UserInfo.Name].WinAmount = userSummary[bet.UserInfo.Name].WinAmount.Add(winInfo.WinAmount)
		}

	}

	for k, v := range userSummary {
		v.Balance = userMap[k].GetBalance()
		winResult = append(winResult, v)

	}

	m.reocrd = nil

	return winResult
}
