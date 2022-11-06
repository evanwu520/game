import { Component, OnInit } from '@angular/core';
import { DemoCmd, DemoRoomAction } from 'src/app/service/websocket/websocket.schema';
import { WebsocketService } from 'src/app/service/websocket/websocket.service';
import { LobbyViewModel } from './lobby.viewmodel';
import { BetAreaViewModel, RoomViewModel } from '../../component/room/room.viewmodel';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  viewModel = new LobbyViewModel()

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  constructor(
    private api: ApiService,
    private websocket: WebsocketService,
  ) { }

  ngOnInit(): void {
  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
  async login() {
    let res = await this.api.guestLogin()
    this.viewModel.token = res
  }

  startConnect() {
    if (!this.websocket.conn) {
      this.websocket.startConnect(this.viewModel.token)
      this.websocket.onMessage$.subscribe((event) => {
        if (event.cmd === DemoCmd.game_player_info) {
          console.log(`使用者:${event.user_name},餘額:${event.balance}`)
          this.viewModel.userName = event.user_name
          this.viewModel.balance = event.balance
        }
        else if (event.cmd === DemoCmd.game_room_list) {
          for (const info of event.room_list) {
            // 檢查並建立房間
            this.roomDataUpdate(info)
          }
        }
        else if (event.cmd === DemoCmd.game_state) {
          // 檢查並建立房間
          this.roomDataUpdate(event)
        }
        else if (event.cmd === DemoCmd.bet) {
          if (event.error_message) {
            console.log(event.error_message)
            return
          }
          console.log(`下注資料:${JSON.stringify(event.obj, null, 2)}`)
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
        else if (event.cmd === DemoCmd.game_result) {
          console.log(`結算資料:${JSON.stringify(event.obj, null, 2)}`)
          this.viewModel.balance = event.balance
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

  roomDataUpdate(info: any) {
    // console.log(info)
    // console.log(`房間:${info.room_name},動作:${info.action},資料:${JSON.stringify(info.data)}`)

    let roon_id = info.room_name || info.room_id
    let data = info.data || info.status

    { // 檢查創建
      let room = this.viewModel.roomList.find(ele => ele.name === roon_id)
      if (!room) {
        let newRoom = new RoomViewModel()
        newRoom.name = roon_id
        this.viewModel.roomList.push(newRoom)
      }
    }
    { // 更新房間資料
      let room = this.viewModel.roomList.find(ele => ele.name === roon_id)
      if (room) {
        room.action = info.action
        if (data && data.seconds) {
          room.targetTime = new Date(new Date().getTime() + data.seconds * 1000);
        }
        if (info.action === DemoRoomAction.start_bet) {
          for (const betArea of room.betAreaList) {
            betArea.point = 0
            betArea.amount = 0
            betArea.isWin = false
          }
        }
        else if (info.action === DemoRoomAction.result) {
          let pointDict = data.point
          for (const idStr in pointDict) {
            const point = pointDict[idStr];
            let id = parseInt(idStr)
            let betArea = room.betAreaList.find(ele => ele.id === id)
            if (betArea) {
              betArea.point = point
            }
          }
          let win_area = data.win_area
          for (const betArea of room.betAreaList) {
            betArea.isWin = (betArea.id === win_area)
          }
        }
      }
    }
  }

  areaClick(room: RoomViewModel, betArea: BetAreaViewModel) {
    // console.log(room, betArea)
    this.websocket.sendBet(room.name, betArea.id, this.viewModel.selectPoint)
  }
}
