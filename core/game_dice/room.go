package game_dice

import (
	"encoding/json"
	"game/core/game"
	"math/rand"
	"sync"
	"time"
)

var gameDiceonce sync.Once

var instance *gameDice

func GetGameInstance() *gameDice {

	gameDiceonce.Do(func() {
		instance = &gameDice{}
	})
	return instance
}

type gameDice struct{}

func (g *gameDice) getStep() []*game.Stage {

	var stages []*game.Stage

	stages = append(stages, &game.Stage{Action: game.StartBet, WaitTime: 12})
	// stages = append(stages, &game.Stage{Action: countDown, WaitTime: 5})
	stages = append(stages, &game.Stage{Action: game.StopBet, WaitTime: 1})
	stages = append(stages, &game.Stage{Action: game.Result, WaitTime: 4})

	return stages
}

func (g *gameDice) NewRoom(setting *game.RoomSetting, status *game.RoomStatus) {

	g.Run(setting, status)
}

func (g *gameDice) Run(setting *game.RoomSetting, status *game.RoomStatus) {

	go func(setting *game.RoomSetting, status *game.RoomStatus, betManager *betRecordManager) {

		for {

			select {
			case v, _ := <-status.Stop:

				if v {

					data := game.RoomActionResp{}
					data.Cmd = game.GameStateCmd
					data.RoomName = setting.RoomId
					data.Action = game.Stop

					status.ChangeRoomStatus(game.Stop, nil)

					byteData, _ := json.Marshal(data)
					game.GameBroadcast <- byteData

					<-status.Start
				}

			default:
				for _, v := range setting.Step {

					status.Action = v.Action

					setting.Action = v.Action
					data := game.RoomActionResp{}
					data.Cmd = game.GameStateCmd
					data.RoomName = setting.RoomId
					data.Action = v.Action

					var m map[string]interface{}

					var results []*settleWinInfo

					switch v.Action {

					case game.StartBet, game.CountDown:
						m = make(map[string]interface{})
						m["seconds"] = v.WaitTime

						// keep room status
						go func(seconds time.Duration) {
							for i := int(seconds); i >= 0; i-- {

								if i > 0 {
									obj := struct {
										Seconds int `json:"seconds"`
									}{Seconds: i}
									status.ChangeRoomStatus(v.Action, obj)
									time.Sleep(1 * time.Second)
								} else {
									status.ChangeRoomStatus(v.Action, nil)
								}

							}

						}(v.WaitTime)

					case game.Stop:
						status.ChangeRoomStatus(v.Action, nil)
					case game.Result:
						// TODO
						m = make(map[string]interface{})
						pointMap := make(map[string]int)
						pointMap["1"] = g.diceRandom()
						pointMap["2"] = g.diceRandom()
						m["point"] = pointMap

						var winArea int

						if pointMap["1"] > pointMap["2"] {

							winArea = 1
						} else if pointMap["1"] < pointMap["2"] {
							winArea = 2
						} else {
							winArea = 3
						}
						m["win_area"] = winArea

						obj := struct {
							Dice1   int `json:"dice1"`
							Dice2   int `json:"dice2"`
							WinArea int `json:"win_area"`
						}{Dice1: pointMap["1"], Dice2: pointMap["2"], WinArea: winArea}

						status.ChangeRoomStatus(v.Action, obj)

						//  結算注單
						results = betManager.Settle(winArea)

					default:

					}

					data.Data = m
					byteData, _ := json.Marshal(data)

					// all user
					game.GameBroadcast <- byteData

					if len(results) > 0 {

						// brocast result to  user
						for _, v := range results {
							resultBrocst := game.ResultBrocastInfo{}
							resultBrocst.UserName = v.UserName
							byteData, _ := json.Marshal(v)
							resultBrocst.ResultInfo = byteData

							go func(result game.ResultBrocastInfo) {

								game.ResultBrocast <- result
							}(resultBrocst)
						}

					}

					m = nil

					time.Sleep(v.WaitTime * time.Second)
				}
			}
		}

	}(setting, status, CreateOrGetRoomBetRecordManger(setting.RoomId))
}

func (g *gameDice) diceRandom() int {
	min := 1
	max := 6

	// TODO
	s1 := rand.NewSource(time.Now().UnixNano() + int64(rand.Intn(1000)))
	r1 := rand.New(s1)

	return r1.Intn(max-min) + min
}
