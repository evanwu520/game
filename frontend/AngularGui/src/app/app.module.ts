import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LobbyComponent } from './page/lobby/lobby.component';
import { WebsocketService } from './service/websocket/websocket.service';
import { RoomComponent } from './component/room/room.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './service/api/api.service';

@NgModule({
  declarations: [
    AppComponent,
    LobbyComponent,
    RoomComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    ApiService,
    WebsocketService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
