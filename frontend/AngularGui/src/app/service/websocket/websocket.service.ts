import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DemoMessage } from './websocket.schema';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  // 第三方測試 http://coolaf.com/tool/chattest

  public conn: WebSocket
  private host = 'ws://123.193.145.165:1002/ws'

  onMessage$ = new Subject<DemoMessage>();

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  constructor() { }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
  startConnect() {
    if (window["WebSocket"]) {
      this.conn = new WebSocket(this.host);
      this.conn.onclose = function(evt) {
        console.log('Connection closed.')
      };
      this.conn.onmessage = (evt: MessageEvent) => {

        let data: string = evt.data
        if (data.includes('wel')) {
          // 如果 含有 welecome 需要去掉
          data = data.split('wel')[0]
        }
        if (data) {
          // 有純的 welecome 訊息
          let mes = new DemoMessage(data)
          this.onMessage$.next(mes)
          // console.log(mes)
        }
      };
    } else {
      console.log('Your browser does not support WebSockets.')
    }
  }

  sendBet(room_id: string, area: number, amount: number) {
    let dict = {
      cmd: 'bet',
      value: {
        room_id,
        area,
        amount,
      }
    }
    this.conn.send(JSON.stringify(dict))
  }
}
