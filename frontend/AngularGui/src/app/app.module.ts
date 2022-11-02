import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LobbyComponent } from './page/lobby/lobby.component';
import { WebsocketService } from './service/websocket/websocket.service';
import { RoomComponent } from './component/room/room.component';

@NgModule({
  declarations: [
    AppComponent,
    LobbyComponent,
    RoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    WebsocketService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
