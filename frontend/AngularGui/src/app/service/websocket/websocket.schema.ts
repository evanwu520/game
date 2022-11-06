
export enum DemoCmd {
  game_player_info = 'game_player_info',
  game_room_list = 'game_room_list',

  game_state = 'game_state',
  bet = 'bet',
  game_result = 'game_result',
}

export enum DemoRoomAction {
  init = 'init',
  start_bet = 'start_bet',
  count_down = 'count_down',
  stop_bet = 'stop_bet',
  result = 'result',
}

export const ActionDisplayName = {
  [DemoRoomAction.init]: '初始化',
  [DemoRoomAction.start_bet]: '下注中',
  [DemoRoomAction.count_down]: '下注中',
  [DemoRoomAction.stop_bet]: '結束下注',
  [DemoRoomAction.result]: '結算中',
}

export class DemoMessage {

  obj: any = {}

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  constructor(public str: string) {
    try {
      this.obj = JSON.parse(str)
    } catch (error) {
      console.log(`DemoMessage parse <${str}> error: error`)
    }
  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
  // present

  // 通用
  get cmd(): DemoCmd | undefined {
    return this.obj.cmd
  }

  // 使用者
  get user_name(): string | undefined {
    return this.obj.user_name
  }

  get balance(): string | undefined {
    return this.obj.balance
  }

  get room_list(): any {
    return this.obj.room_list
  }

  // 房間
  get room_name(): string | undefined {
    return this.obj.room_name
  }

  get action(): DemoRoomAction | undefined {
    return this.obj.action
  }

  get data(): any {
    return this.obj.data
  }

  // 下注
  get bet_info(): any {
    return this.obj.bet_info
  }

  get error_message(): string {
    return this.obj.error_message
  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
}
