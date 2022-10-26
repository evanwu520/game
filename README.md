using gorilla websocket to practice brocast game step  

# room manage api

- create room  curl http://127.0.0.1:8080/room?roomId=r2

- stop room curl http://127.0.0.1:8080/stop?roomId=r2

- start room curl http://127.0.0.1:8080/start?roomId=r2


---



# client cmd

- brocast 
```json
{"cmd":"brocast","value":"brocast message"}
```


- bet

area => 1: left dice win 2: right dice win  3: tie

```json
{"cmd":"bet","value":{"room_id":"r1","area":1,"amount":100}}
```


# server return cmd 


- brocast 
```json
{"cmd":"brocast","value":"brocast message"}
```


- game player info
```
{"cmd":"game_player_info","user_info":{"name":"851592923","balance":"1000"}}

```

- bet


```
{"cmd":"bet","bet_info":{"room_id":"r1","area":1,"amount":"100"},"balance":"900","error_message":""}
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
