package core

import (
	"game/core/game_dice"
	"game/core/player"
	"sync"
)

type gameBet struct {
}

var onceGameBet sync.Once

var gameBetInstance *gameBet

func GetGameBetInstance() *gameBet {

	onceGameBet.Do(func() {
		gameBetInstance = &gameBet{}

	})
	return gameBetInstance
}

// TODO remove
// func (g *gameBet) Bet(info *player.UserInfo, v interface{}, cmd string) []byte {

// 	// TODO judge game
// 	return game_dice.GetGameBetInstance().Bet(GetGameInstance().rooms, info, v, cmd)

// }

func (g *gameBet) BetApi(info *player.UserInfo, v interface{}) []byte {

	// TODO judge game
	return game_dice.GetGameBetInstance().BetApi(GetGameInstance().rooms, info, v)
}
