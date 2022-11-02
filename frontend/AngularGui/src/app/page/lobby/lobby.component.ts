import { Component, OnInit } from '@angular/core';
import { DemoCmd, DemoRoomAction } from 'src/app/service/websocket/websocket.schema';
import { WebsocketService } from 'src/app/service/websocket/websocket.service';
import { LobbyViewModel } from './lobby.viewmodel';
import { BetAreaViewModel, RoomViewModel } from '../../component/room/room.viewmodel';

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
              if (event.data && event.data.seconds) {
                room.targetTime = new Date(new Date().getTime() + event.data.seconds * 1000);
              }
              if (event.action === DemoRoomAction.start_bet) {
                for (const betArea of room.betAreaList) {
                  betArea.point = 0
                  betArea.amount = 0
                  betArea.isWin = false
                }
              }
              else if (event.action === DemoRoomAction.result) {
                let pointDict = event.data.point
                for (const idStr in pointDict) {
                  const point = pointDict[idStr];
                  let id = parseInt(idStr)
                  let betArea = room.betAreaList.find(ele => ele.id === id)
                  if (betArea) {
                    betArea.point = point
                  }
                }
                let win_area = event.data.win_area
                for (const betArea of room.betAreaList) {
                  betArea.isWin = (betArea.id === win_area)
                }
              }
            }
          }
        }
        else if (event.cmd === DemoCmd.bet) {
          this.viewModel.balance = event.balance
          let bet_info = event.bet_info
          let room = this.viewModel.roomList.find(ele => ele.name === bet_info.room_id)
          if (room) {
            let betArea = room.betAreaList.find(ele => ele.id === bet_info.area)
            if (betArea) {
              betArea.amount = parseInt(bet_info.amount)
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

  areaClick(room: RoomViewModel, betArea: BetAreaViewModel) {
    // console.log(room, betArea)
    this.websocket.sendBet(room.name, betArea.id, this.viewModel.selectPoint)
  }
}
