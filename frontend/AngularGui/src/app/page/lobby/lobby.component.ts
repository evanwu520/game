import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/service/websocket/websocket.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

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
    }
    else {
      console.log('連線已存在')
    }
  }
}
