using gorilla websocket to practice brocast game step  

# room manage api

- create room  curl http://127.0.0.1:8080/room?roomId=r2

- stop room curl http://127.0.0.1:8080/stop?roomId=r2

- start room curl http://127.0.0.1:8080/start?roomId=r2


# game api
- guest login
```
 curl  http://127.0.0.1:8080/guestLogin 

 return token

 ws conn string "ws://" + document.location.host + "/ws?token="+token)
```


 - bet
 ```
 curl -X POST http://127.0.0.1:8080/bet -H "token:930142123cd4fb3247d8cd3d0b2630e3" -H "Conten-Type: application/json" -d '{"room_id":"r1","area":1,"amount":10}'

{"bet_info":{"room_id":"r1","area":1,"amount":"10"},"balance":"850","user_total_bet":{"area1":"10","area2":"40","area3":"30"},"error_message":""}
```

---



# client cmd

- brocast 
```json
{"cmd":"brocast","value":"brocast message"}
```




# server return cmd 


- brocast 
```json
{"cmd":"brocast","value":"brocast message"}
```


- game player info

when connect , the info will return client 



```
{"cmd":"game_player_info","user_name":"976222189","balance":"1000"}

```

game_room_list => all room from before to now

```
{"cmd":"game_room_list","room_list":[{"room_id":"r1","action":"start_bet","status":{"seconds":9}}]}
{"cmd":"game_room_list","room_list":[{"room_id":"r1","action":"stop_bet","status":null}]}
{"cmd":"game_room_list","room_list":[{"room_id":"r1","action":"result","status":{"dice1":5,"dice2":3,"win_area":1}}]}
```


- game room list

```
{"cmd":"game_room","rooms":["r2","r1"]}
```

- game state

```
{"cmd":"game_state","room_name":"r1","action":"start_bet","data":{"seconds":5}}

seconds => until to stop step seconds


{"cmd":"game_state","room_name":"r1","action":"count_down","data":{"seconds":3}}


seconds => until to stop step seconds


{"cmd":"game_state","room_name":"r1","action":"stop_bet","data":null}


{"cmd":"game_state","room_name":"r1","action":"result","data":{"point":{"1":5,"2":3},"win_area":1}}

point => key: area , value: dice points



```

- game result

```json
{"cmd":"game_result","user_name":"847127347","room_id":"r2","win_amount":"20","balance":"1010"}
```


**_if cmd not contain above cmd  , please direct show data_**
