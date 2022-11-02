import { ActionDisplayName, DemoRoomAction } from "src/app/service/websocket/websocket.schema"

export class RoomViewModel {

  name = ''
  action = DemoRoomAction.init

  get actionName() {
    return ActionDisplayName[this.action]
  }

}
