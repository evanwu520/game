package main

type cmd string

const (
	gameList cmd = "game_list" // TODO
	bet      cmd = "bet"
	brocast  cmd = "brocast"
)

type event struct {
	Cmd   cmd         `json:"cmd"`
	Value interface{} `json:"value"`
}
