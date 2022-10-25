package main

type cmd string

const (
	bet     cmd = "bet"
	brocast cmd = "brocast"
)

type event struct {
	Cmd   cmd         `json:"cmd"`
	Value interface{} `json:"value"`
}
