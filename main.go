// Copyright 2013 The Gorilla WebSocket Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	"flag"
	"game/api"
	"game/core/game_dice"
	"log"
	"net/http"
)

var addr = flag.String("addr", ":8080", "http service address")

func serveHome(w http.ResponseWriter, r *http.Request) {
	log.Println(r.URL)
	// if r.URL.Path != "/" {
	// 	http.Error(w, "Not found", http.StatusNotFound)
	// 	return
	// }
	// if r.Method != http.MethodGet {
	// 	http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	// 	return
	// }
	http.ServeFile(w, r, "home.html")
}

func main() {
	flag.Parse()
	hub := newHub()
	go hub.run()
	go hub.runGameListener()

	// TODO init
	game_dice.GetGameBetInstance()

	gameApi := api.NewGameApi()

	http.HandleFunc("/guestLogin", api.Cors(gameApi.GuestLogin))

	betHandler := http.HandlerFunc(api.Cors(gameApi.Bet))
	http.Handle("/bet", api.MiddlewareToken(betHandler))

	gameManager := api.NewGameManager()

	http.HandleFunc("/room", api.Cors(gameManager.NewRoom))

	http.HandleFunc("/stop", api.Cors(gameManager.Stop))

	http.HandleFunc("/start", api.Cors(gameManager.Start))

	http.HandleFunc("/debug", serveHome)
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWs(hub, w, r)
	})

	http.Handle("/", http.FileServer(http.Dir("./static")))
	err := http.ListenAndServe(*addr, nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
