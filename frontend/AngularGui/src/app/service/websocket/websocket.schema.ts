
export enum DemoCmd {
  game_player_info = 'game_player_info',
  game_state = 'game_state'
}

export enum DemoRoomAction {
  start_bet = 'stop_bet',
  count_down = 'count_down',
  stop_bet = 'stop_bet',
  result = 'result',
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

  get balance(): number | undefined {
    return this.obj.balance
  }

  // 房間
  get room_name(): string | undefined {
    return this.obj.room_name
  }

  get action(): DemoRoomAction | undefined {
    return this.obj.action
  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
}
