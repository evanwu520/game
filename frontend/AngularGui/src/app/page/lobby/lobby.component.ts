import { Component, OnInit } from '@angular/core';
import { DemoCmd } from 'src/app/service/websocket/websocket.schema';
import { WebsocketService } from 'src/app/service/websocket/websocket.service';
import { LobbyViewModel } from './lobby.viewmodel';
import { RoomViewModel } from '../../component/room/room.viewmodel';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  viewModel = new LobbyViewModel()

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
          // console.log(`房間:${e.room_name},動作:${e.action}`)

          // 檢查並建立房間
          {
            let room = this.viewModel.roomList.find(ele => ele.name === e.room_name)
            if (!room) {
              let newRoom = new RoomViewModel()
              newRoom.name = e.room_name
              this.viewModel.roomList.push(newRoom)
            }
          }
          {
            let room = this.viewModel.roomList.find(ele => ele.name === e.room_name)
            if (room) {
              room.action = e.action
            }
          }
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
