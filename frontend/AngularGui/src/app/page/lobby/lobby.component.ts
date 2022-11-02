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
      this.websocket.onMessage$.subscribe((event) => {
        if (event.cmd === DemoCmd.game_player_info) {
          console.log(`使用者:${event.user_name},餘額:${event.balance}`)
          this.viewModel.userName = event.user_name
          this.viewModel.balance = event.balance
        }
        else if (event.cmd === DemoCmd.game_state) {
          console.log(`房間:${event.room_name},動作:${event.action},資料:${JSON.stringify(event.data)}`)

          // 檢查並建立房間
          {
            let room = this.viewModel.roomList.find(ele => ele.name === event.room_name)
            if (!room) {
              let newRoom = new RoomViewModel()
              newRoom.name = event.room_name
              this.viewModel.roomList.push(newRoom)
            }
          }
          {
            let room = this.viewModel.roomList.find(ele => ele.name === event.room_name)
            if (room) {
              room.action = event.action
            }
          }
        }
        else {
          console.log(event.cmd, event.obj)
        }
      })
    }
    else {
      console.log('連線已存在')
    }
  }
}
