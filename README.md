using gorilla websocket to practice brocast game step  


- create room  curl http://127.0.0.1:8080/room?roomId=r2

- stop room curl http://127.0.0.1:8080/stop?roomId=r2

- start room curl http://127.0.0.1:8080/start?roomId=r2


---


brocast data
```json
{"cmd":"brocast","value":"brocast message"}
```

bet data request

```json
{"cmd":"bet","value":{"room_id":"r1","area":1,"amount":100}}
```

bet data response
```
{"action":"bet","bet_info":{"room_id":"r1","area":1,"amount":"100"},"balance":"900","error_message":""}
```
