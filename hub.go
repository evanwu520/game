// Copyright 2013 The Gorilla WebSocket Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	"game/core/game"
	"sync"
)

// Hub maintains the set of active clients and broadcasts messages to the
// clients.
type Hub struct {
	// Registered clients.
	clients map[*Client]bool

	// Inbound messages from the clients.
	broadcast chan []byte

	// Register requests from the clients.
	register chan *Client

	// Unregister requests from clients.
	unregister chan *Client
}

func newHub() *Hub {
	return &Hub{
		broadcast:  make(chan []byte),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		clients:    make(map[*Client]bool),
	}
}

//
func (h *Hub) run() {
	for {
		select {
		case client := <-h.register:
			h.clients[client] = true

		case client := <-h.unregister:
			if _, ok := h.clients[client]; ok {
				delete(h.clients, client)
				close(client.send)
			}
		case message := <-h.broadcast:
			for client := range h.clients {
				select {
				case client.send <- message:
				default:
					close(client.send)
					delete(h.clients, client)
				}
			}
		}
	}
}

// 個別發送
func (h *Hub) runGameListener() {

	for {
		select {
		case bytes := <-game.GameBroadcast:
			var wg sync.WaitGroup

			for client := range h.clients {

				wg.Add(1)
				go func(c *Client, b []byte) {
					c.send <- b
					defer wg.Done()
				}(client, bytes)

			}
			wg.Wait()

		case result := <-game.ResultBrocast:

			for client := range h.clients {

				if client.userInfo.Name == result.UserName {
					client.send <- result.ResultInfo
				}
			}

		}
	}
}
