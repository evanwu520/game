package core

import (
	"encoding/json"
	"fmt"
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
	RoomId   string          `json:"room_id"`
	Area     int             `json:"area"`
	Amount   decimal.Decimal `json:"amount"`
	UserInfo *UserInfo       `json:"user_info"`
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

//
func (g *gameBet) Bet(info *UserInfo, v interface{}, cmd string) []byte {

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

			resp.ErrorMessage = fmt.Sprintf("%s balance is not enough !", info.Name)
			data, _ := json.Marshal(resp)

			return data
		}

		if room.Action == startBet || room.Action == countDown {
			info.Balance = info.Balance.Sub(betAmount)
			resp.Balnace = info.Balance
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
	Cmd       action          `json:"cmd"`
	UserName  string          `json:"user_name"`
	RoomId    string          `json:"room_id"`
	WinAmount decimal.Decimal `json:"win_amount"`
	Balance   decimal.Decimal `json:"balance"`
}

func (m *betRecordManager) Settle(area int) []settleWinInfo {

	m.lock.Lock()
	defer m.lock.Unlock()

	var winResult []settleWinInfo

	for _, bet := range m.reocrd {

		// TODO
		if bet.Area == area {
			// win
			fmt.Println(bet.RoomId, bet.UserInfo.Name, bet.Area, area, "win")

			winInfo := settleWinInfo{}
			winInfo.Cmd = gameResultCmd
			winInfo.UserName = bet.UserInfo.Name
			winInfo.RoomId = bet.RoomId
			winInfo.WinAmount = bet.Amount.Mul(decimal.NewFromInt(2))

			// TODO
			bet.UserInfo.Lock.Lock()
			bet.UserInfo.Balance = bet.UserInfo.Balance.Add(winInfo.WinAmount)
			winInfo.Balance = bet.UserInfo.Balance
			bet.UserInfo.Lock.Unlock()

			winResult = append(winResult, winInfo)

		} else {
			// lose
			fmt.Println(bet.RoomId, bet.UserInfo.Name, bet.Area, area, "lose")
		}

	}

	m.reocrd = nil

	return winResult
}
