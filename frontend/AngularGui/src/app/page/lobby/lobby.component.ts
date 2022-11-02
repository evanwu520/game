import { Component, OnInit } from '@angular/core';
import { DemoCmd } from 'src/app/service/websocket/websocket.schema';
import { WebsocketService } from 'src/app/service/websocket/websocket.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  constructor(
    private websocket: WebsocketService,
  ) { }

  ngOnInit(): void {
  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
  startConnect() {
    if (!this.websocket.conn) {
      this.websocket.startConnect()
      this.websocket.onMessage$.subscribe((e) => {
        if (e.cmd === DemoCmd.game_player_info) {
          console.log(`使用者:${e.user_name},餘額:${e.balance}`)
        }
        else if (e.cmd === DemoCmd.game_state) {
          console.log(`房間:${e.room_name},動作:${e.action}`)
        }
        else {
          console.log(e.cmd, e.obj)
        }
      })
    }
    else {
      console.log('連線已存在')
    }
  }
}
