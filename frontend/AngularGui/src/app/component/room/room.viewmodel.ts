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

  result = []

  betAreaList: BetAreaViewModel[] = AllBetAreaId.map(id => new BetAreaViewModel(Number(id)))
}

export enum AllBetArea {
  Left = 1,
  Right = 2,
  Tie = 3,
}
const AllBetAreaId = Object.keys(AllBetArea).filter(value => !isNaN(Number(value)))

const BetAreaNameMap = {
  [AllBetArea.Left]: '1比較大',
  [AllBetArea.Right]: '2比較大',
  [AllBetArea.Tie]: '和',
}
export class BetAreaViewModel {

  amount = 0
  isWin = false

  constructor(
    public id: number
  ) { }

  get displayName() {
    return BetAreaNameMap[this.id]
  }
}
