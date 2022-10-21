using gorilla websocket to practice brocast game step  


brocast data
```json
{
  "cmd": "brocast",
  "value": "brocast message"
}
```

bet data 

```json
{
  "cmd": "bet",
  "value": {
    "room_id": "r1",
    "area": 1,
    "amount": 100
  }
}
```
- create room  curl http://127.0.0.1:8080/room?roomId=r2

- stop room curl http://127.0.0.1:8080/stop?roomId=r2

- start room curl http://127.0.0.1:8080/start?roomId=r2