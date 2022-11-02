import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  // 第三方測試 http://coolaf.com/tool/chattest

  public conn: WebSocket
  private host = 'ws://123.193.145.165:1002/ws'

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  constructor() { }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
  startConnect() {
    if (window["WebSocket"]) {
      this.conn = new WebSocket(this.host);
      this.conn.onclose = function(evt) {
        console.log('Connection closed.')
      };
      this.conn.onmessage = function(evt: MessageEvent) {

        let data: string = evt.data
        if (data.includes('wel')) {
          // 如果 含有 welecome 需要去掉
          data = data.split('wel')[0]
        }
        console.log(JSON.parse(data))
      };
    } else {
      console.log('Your browser does not support WebSockets.')
    }
  }
}
