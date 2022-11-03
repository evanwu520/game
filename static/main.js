(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "+Dqb":
/*!********************************************************!*\
  !*** ./src/app/service/websocket/websocket.service.ts ***!
  \********************************************************/
/*! exports provided: WebsocketService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebsocketService", function() { return WebsocketService; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _websocket_schema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./websocket.schema */ "kxLR");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");



class WebsocketService {
    // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
    constructor() {
        // private host = `ws://123.193.145.165:1002/ws`
        this.host = `ws://${document.location.host}/ws`;
        this.onMessage$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
    }
    // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
    startConnect() {
        if (window["WebSocket"]) {
            this.conn = new WebSocket(this.host);
            this.conn.onclose = function (evt) {
                console.log('Connection closed.');
            };
            this.conn.onmessage = (evt) => {
                let data = evt.data;
                let split = data.split('\n');
                for (const subDate of split) {
                    if (subDate && !subDate.includes('wel')) {
                        // 有純的 welecome 訊息
                        let mes = new _websocket_schema__WEBPACK_IMPORTED_MODULE_1__["DemoMessage"](subDate);
                        this.onMessage$.next(mes);
                        // console.log(mes)
                    }
                }
            };
        }
        else {
            console.log('Your browser does not support WebSockets.');
        }
    }
    sendBet(room_id, area, amount) {
        let dict = {
            cmd: 'bet',
            value: {
                room_id,
                area,
                amount,
            }
        };
        this.conn.send(JSON.stringify(dict));
    }
}
WebsocketService.ɵfac = function WebsocketService_Factory(t) { return new (t || WebsocketService)(); };
WebsocketService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: WebsocketService, factory: WebsocketService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/w91379137/git_eu/game/frontend/AngularGui/src/main.ts */"zUnb");


/***/ }),

/***/ "A5Eh":
/*!**************************************************!*\
  !*** ./src/app/component/room/room.viewmodel.ts ***!
  \**************************************************/
/*! exports provided: RoomViewModel, BetAreaViewModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoomViewModel", function() { return RoomViewModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BetAreaViewModel", function() { return BetAreaViewModel; });
/* harmony import */ var src_app_service_websocket_websocket_schema__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/service/websocket/websocket.schema */ "kxLR");

class RoomViewModel {
    constructor() {
        this.name = '';
        this.action = src_app_service_websocket_websocket_schema__WEBPACK_IMPORTED_MODULE_0__["DemoRoomAction"].init;
        this.targetTime = new Date();
        this.remaindTime = '';
        this.betAreaList = AllBetAreaId.map(id => new BetAreaViewModel(id));
    }
    updateRemaindTime() {
        let ms = this.targetTime.getTime() - new Date().getTime();
        let s = Math.floor(Math.max(0, ms / 1000));
        this.remaindTime = s.toString();
    }
    get actionName() {
        return src_app_service_websocket_websocket_schema__WEBPACK_IMPORTED_MODULE_0__["ActionDisplayName"][this.action];
    }
}
const AllBetAreaId = [1, 2];
class BetAreaViewModel {
    constructor(id) {
        this.id = id;
        this.point = 0;
        this.amount = 0;
        this.isWin = false;
    }
}


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "FPj7":
/*!**************************************************!*\
  !*** ./src/app/component/room/room.component.ts ***!
  \**************************************************/
/*! exports provided: RoomComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoomComponent", function() { return RoomComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");





function RoomComponent_ng_container_0_ng_container_10_label_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const betArea_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u9EDE\u6578:", betArea_r2.point, "");
} }
function RoomComponent_ng_container_0_ng_container_10_label_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "WIN");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function RoomComponent_ng_container_0_ng_container_10_label_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "_");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function RoomComponent_ng_container_0_ng_container_10_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function RoomComponent_ng_container_0_ng_container_10_Template_div_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const betArea_r2 = ctx.$implicit; const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r7.areaClick.emit(betArea_r2); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, RoomComponent_ng_container_0_ng_container_10_label_8_Template, 2, 1, "label", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, RoomComponent_ng_container_0_ng_container_10_label_10_Template, 2, 0, "label", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, RoomComponent_ng_container_0_ng_container_10_label_11_Template, 2, 0, "label", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const betArea_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u4E0B\u6CE8\u5340:", betArea_r2.id, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u58D3\u6CE8:", betArea_r2.amount, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", betArea_r2.point !== 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", betArea_r2.isWin);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !betArea_r2.isWin);
} }
function RoomComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "\u00A0 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, RoomComponent_ng_container_0_ng_container_10_Template, 12, 5, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u623F\u540D: ", ctx_r0.viewModel.name, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u52D5\u4F5C: ", ctx_r0.viewModel.actionName, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u5012\u6578: ", ctx_r0.viewModel.remaindTime, "\u79D2");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.viewModel.betAreaList);
} }
class RoomComponent {
    // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
    constructor() {
        this.areaClick = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.ngUnsubscribe = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    ngOnInit() {
        const source = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["interval"])(300);
        source.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeUntil"])(this.ngUnsubscribe))
            .subscribe(() => {
            this.viewModel.updateRemaindTime();
        });
    }
    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
RoomComponent.ɵfac = function RoomComponent_Factory(t) { return new (t || RoomComponent)(); };
RoomComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: RoomComponent, selectors: [["app-room"]], inputs: { viewModel: "viewModel" }, outputs: { areaClick: "areaClick" }, decls: 1, vars: 1, consts: [[4, "ngIf"], [4, "ngFor", "ngForOf"], [1, "bet-area", 3, "click"]], template: function RoomComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, RoomComponent_ng_container_0_Template, 12, 4, "ng-container", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.viewModel);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"]], styles: [".bet-area[_ngcontent-%COMP%] {\n  width: 200px;\n  height: 200px;\n  display: inline-block;\n  border: 1px solid black;\n  margin: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Jvb20uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDRSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHFCQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0FBQUYiLCJmaWxlIjoicm9vbS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLmJldC1hcmVhIHtcbiAgd2lkdGg6IDIwMHB4O1xuICBoZWlnaHQ6IDIwMHB4O1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xuICBtYXJnaW46MTBweDtcbn1cbiJdfQ== */"] });


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");


class AppComponent {
    constructor() {
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "VxV7":
/*!***********************************************!*\
  !*** ./src/app/page/lobby/lobby.component.ts ***!
  \***********************************************/
/*! exports provided: LobbyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LobbyComponent", function() { return LobbyComponent; });
/* harmony import */ var src_app_service_websocket_websocket_schema__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/service/websocket/websocket.schema */ "kxLR");
/* harmony import */ var _lobby_viewmodel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lobby.viewmodel */ "rrY1");
/* harmony import */ var _component_room_room_viewmodel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../component/room/room.viewmodel */ "A5Eh");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_service_websocket_websocket_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/service/websocket/websocket.service */ "+Dqb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _component_room_room_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../component/room/room.component */ "FPj7");







function LobbyComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "button", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function LobbyComponent_ng_container_0_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r4); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r3.startConnect(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "\u9023\u7DDA");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} }
function LobbyComponent_ng_container_1_ng_container_6_label_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function LobbyComponent_ng_container_1_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "button", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function LobbyComponent_ng_container_1_ng_container_6_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r9); const point_r6 = ctx.$implicit; const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r8.viewModel.selectPoint = point_r6; });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, LobbyComponent_ng_container_1_ng_container_6_label_2_Template, 2, 0, "label", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const point_r6 = ctx.$implicit;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r5.viewModel.selectPoint === point_r6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", point_r6, " ");
} }
function LobbyComponent_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, LobbyComponent_ng_container_1_ng_container_6_Template, 4, 2, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("\u4F7F\u7528\u8005:", ctx_r1.viewModel.userName, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("\u9918\u984D:", ctx_r1.viewModel.balance, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r1.viewModel.optionalPoint);
} }
function LobbyComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "app-room", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("areaClick", function LobbyComponent_ng_container_3_Template_app_room_areaClick_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r12); const room_r10 = ctx.$implicit; const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r11.areaClick(room_r10, $event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const room_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("viewModel", room_r10);
} }
class LobbyComponent {
    // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
    constructor(websocket) {
        this.websocket = websocket;
        this.viewModel = new _lobby_viewmodel__WEBPACK_IMPORTED_MODULE_1__["LobbyViewModel"]();
    }
    ngOnInit() {
    }
    // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
    startConnect() {
        if (!this.websocket.conn) {
            this.websocket.startConnect();
            this.websocket.onMessage$.subscribe((event) => {
                if (event.cmd === src_app_service_websocket_websocket_schema__WEBPACK_IMPORTED_MODULE_0__["DemoCmd"].game_player_info) {
                    console.log(`使用者:${event.user_name},餘額:${event.balance}`);
                    this.viewModel.userName = event.user_name;
                    this.viewModel.balance = event.balance;
                }
                else if (event.cmd === src_app_service_websocket_websocket_schema__WEBPACK_IMPORTED_MODULE_0__["DemoCmd"].game_state) {
                    console.log(`房間:${event.room_name},動作:${event.action},資料:${JSON.stringify(event.data)}`);
                    // 檢查並建立房間
                    {
                        let room = this.viewModel.roomList.find(ele => ele.name === event.room_name);
                        if (!room) {
                            let newRoom = new _component_room_room_viewmodel__WEBPACK_IMPORTED_MODULE_2__["RoomViewModel"]();
                            newRoom.name = event.room_name;
                            this.viewModel.roomList.push(newRoom);
                        }
                    }
                    {
                        let room = this.viewModel.roomList.find(ele => ele.name === event.room_name);
                        if (room) {
                            room.action = event.action;
                            if (event.data && event.data.seconds) {
                                room.targetTime = new Date(new Date().getTime() + event.data.seconds * 1000);
                            }
                            if (event.action === src_app_service_websocket_websocket_schema__WEBPACK_IMPORTED_MODULE_0__["DemoRoomAction"].start_bet) {
                                for (const betArea of room.betAreaList) {
                                    betArea.point = 0;
                                    betArea.amount = 0;
                                    betArea.isWin = false;
                                }
                            }
                            else if (event.action === src_app_service_websocket_websocket_schema__WEBPACK_IMPORTED_MODULE_0__["DemoRoomAction"].result) {
                                let pointDict = event.data.point;
                                for (const idStr in pointDict) {
                                    const point = pointDict[idStr];
                                    let id = parseInt(idStr);
                                    let betArea = room.betAreaList.find(ele => ele.id === id);
                                    if (betArea) {
                                        betArea.point = point;
                                    }
                                }
                                let win_area = event.data.win_area;
                                for (const betArea of room.betAreaList) {
                                    betArea.isWin = (betArea.id === win_area);
                                }
                            }
                        }
                    }
                }
                else if (event.cmd === src_app_service_websocket_websocket_schema__WEBPACK_IMPORTED_MODULE_0__["DemoCmd"].bet) {
                    if (event.error_message) {
                        console.log(event.error_message);
                        return;
                    }
                    console.log(`下注資料:${JSON.stringify(event.obj, null, 2)}`);
                    this.viewModel.balance = event.balance;
                    let bet_info = event.bet_info;
                    let room = this.viewModel.roomList.find(ele => ele.name === bet_info.room_id);
                    if (room) {
                        let betArea = room.betAreaList.find(ele => ele.id === bet_info.area);
                        if (betArea) {
                            betArea.amount = parseInt(bet_info.amount);
                        }
                    }
                }
                else if (event.cmd === src_app_service_websocket_websocket_schema__WEBPACK_IMPORTED_MODULE_0__["DemoCmd"].game_result) {
                    console.log(`結算資料:${JSON.stringify(event.obj, null, 2)}`);
                    this.viewModel.balance = event.balance;
                }
                else {
                    console.log(event.cmd, event.obj);
                }
            });
        }
        else {
            console.log('連線已存在');
        }
    }
    areaClick(room, betArea) {
        // console.log(room, betArea)
        this.websocket.sendBet(room.name, betArea.id, this.viewModel.selectPoint);
    }
}
LobbyComponent.ɵfac = function LobbyComponent_Factory(t) { return new (t || LobbyComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_service_websocket_websocket_service__WEBPACK_IMPORTED_MODULE_4__["WebsocketService"])); };
LobbyComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: LobbyComponent, selectors: [["app-lobby"]], decls: 4, vars: 3, consts: [[4, "ngIf"], [4, "ngFor", "ngForOf"], [3, "click"], [3, "viewModel", "areaClick"]], template: function LobbyComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, LobbyComponent_ng_container_0_Template, 3, 0, "ng-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, LobbyComponent_ng_container_1_Template, 7, 3, "ng-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, LobbyComponent_ng_container_3_Template, 2, 1, "ng-container", 1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.viewModel.userName);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.viewModel.userName);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.viewModel.roomList);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _component_room_room_component__WEBPACK_IMPORTED_MODULE_6__["RoomComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJsb2JieS5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _page_lobby_lobby_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./page/lobby/lobby.component */ "VxV7");
/* harmony import */ var _service_websocket_websocket_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./service/websocket/websocket.service */ "+Dqb");
/* harmony import */ var _component_room_room_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./component/room/room.component */ "FPj7");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");







class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [
        _service_websocket_websocket_service__WEBPACK_IMPORTED_MODULE_4__["WebsocketService"],
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_1__["AppRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
        _page_lobby_lobby_component__WEBPACK_IMPORTED_MODULE_3__["LobbyComponent"],
        _component_room_room_component__WEBPACK_IMPORTED_MODULE_5__["RoomComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_1__["AppRoutingModule"]] }); })();


/***/ }),

/***/ "kxLR":
/*!*******************************************************!*\
  !*** ./src/app/service/websocket/websocket.schema.ts ***!
  \*******************************************************/
/*! exports provided: DemoCmd, DemoRoomAction, ActionDisplayName, DemoMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DemoCmd", function() { return DemoCmd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DemoRoomAction", function() { return DemoRoomAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionDisplayName", function() { return ActionDisplayName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DemoMessage", function() { return DemoMessage; });
var DemoCmd;
(function (DemoCmd) {
    DemoCmd["game_player_info"] = "game_player_info";
    DemoCmd["game_state"] = "game_state";
    DemoCmd["bet"] = "bet";
    DemoCmd["game_result"] = "game_result";
})(DemoCmd || (DemoCmd = {}));
var DemoRoomAction;
(function (DemoRoomAction) {
    DemoRoomAction["init"] = "init";
    DemoRoomAction["start_bet"] = "start_bet";
    DemoRoomAction["count_down"] = "count_down";
    DemoRoomAction["stop_bet"] = "stop_bet";
    DemoRoomAction["result"] = "result";
})(DemoRoomAction || (DemoRoomAction = {}));
const ActionDisplayName = {
    [DemoRoomAction.init]: '初始化',
    [DemoRoomAction.start_bet]: '下注中',
    [DemoRoomAction.count_down]: '下注中',
    [DemoRoomAction.stop_bet]: '結束下注',
    [DemoRoomAction.result]: '結算中',
};
class DemoMessage {
    // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
    constructor(str) {
        this.str = str;
        this.obj = {};
        try {
            this.obj = JSON.parse(str);
        }
        catch (error) {
            console.log(`DemoMessage parse <${str}> error: error`);
        }
    }
    // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
    // present
    // 通用
    get cmd() {
        return this.obj.cmd;
    }
    // 使用者
    get user_name() {
        return this.obj.user_name;
    }
    get balance() {
        return this.obj.balance;
    }
    // 房間
    get room_name() {
        return this.obj.room_name;
    }
    get action() {
        return this.obj.action;
    }
    get data() {
        return this.obj.data;
    }
    // 下注
    get bet_info() {
        return this.obj.bet_info;
    }
    get error_message() {
        return this.obj.error_message;
    }
}


/***/ }),

/***/ "rrY1":
/*!***********************************************!*\
  !*** ./src/app/page/lobby/lobby.viewmodel.ts ***!
  \***********************************************/
/*! exports provided: LobbyViewModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LobbyViewModel", function() { return LobbyViewModel; });
class LobbyViewModel {
    constructor() {
        this.userName = '';
        this.balance = '';
        this.selectPoint = 50;
        this.optionalPoint = [50, 100, 150, 200];
        this.roomList = [];
    }
}


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _page_lobby_lobby_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./page/lobby/lobby.component */ "VxV7");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");




const routes = [
    { path: '', component: _page_lobby_lobby_component__WEBPACK_IMPORTED_MODULE_1__["LobbyComponent"] },
];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map