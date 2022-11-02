import { RoomViewModel } from "src/app/component/room/room.viewmodel";

export class LobbyViewModel {

  userName = ''
  balance = ''

  selectPoint = 50
  optionalPoint = [50, 100, 150, 200]

  roomList: RoomViewModel[] = []

}
