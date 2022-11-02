import { ActionDisplayName, DemoRoomAction } from "src/app/service/websocket/websocket.schema"

export class RoomViewModel {

  name = ''
  action = DemoRoomAction.init
  targetTime = new Date()
  remaindTime = ''
  updateRemaindTime() {
    let ms = this.targetTime.getTime() - new Date().getTime();
    let s = Math.floor(Math.max(0, ms / 1000))
    this.remaindTime = s.toString();
  }

  get actionName() {
    return ActionDisplayName[this.action]
  }


  betAreaList: BetAreaViewModel[] = AllBetAreaId.map(id => new BetAreaViewModel(id))

}

const AllBetAreaId = [1, 2]
class BetAreaViewModel {

  point = 0
  isWin = false

  constructor(public id: number = 0) { }

}
