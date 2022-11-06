import { ActionDisplayName, DemoRoomAction } from "src/app/service/websocket/websocket.schema"

const initResult = ['[1] 未知', '[2] 未知']
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

  result = initResult

  betAreaList: BetAreaViewModel[] = AllBetAreaId.map(id => new BetAreaViewModel(Number(id)))

  reset() {
    this.result = initResult

    for (const betArea of this.betAreaList) {
      betArea.amount = 0
      betArea.isWin = false
    }
  }
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
