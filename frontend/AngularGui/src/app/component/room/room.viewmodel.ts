import { ActionDisplayName, DemoRoomAction } from "src/app/service/websocket/websocket.schema"

export class RoomViewModel {

  name = ''
  action = DemoRoomAction.init

  get actionName() {
    return ActionDisplayName[this.action]
  }

  betAreaList: BetAreaViewModel[] = AllBetAreaId.map(id => new BetAreaViewModel(id))

}

const AllBetAreaId = [1, 2]
class BetAreaViewModel {

  constructor(public id: number = 0) { }

}
