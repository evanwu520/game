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
    startConnect(token) {
        if (window["WebSocket"]) {
            this.conn = new WebSocket(`${this.host}?token=${token}`);
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
/*! exports provided: RoomViewModel, AllBetArea, BetAreaViewModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoomViewModel", function() { return RoomViewModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AllBetArea", function() { return AllBetArea; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BetAreaViewModel", function() { return BetAreaViewModel; });
/* harmony import */ var src_app_service_websocket_websocket_schema__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/service/websocket/websocket.schema */ "kxLR");

const initResult = ['[1] 未知', '[2] 未知'];
class RoomViewModel {
    constructor() {
        this.name = '';
        this.action = src_app_service_websocket_websocket_schema__WEBPACK_IMPORTED_MODULE_0__["DemoRoomAction"].init;
        this.targetTime = new Date();
        this.remaindTime = '';
        this.result = initResult;
        this.betAreaList = AllBetAreaId.map(id => new BetAreaViewModel(Number(id)));
    }
    updateRemaindTime() {
        let ms = this.targetTime.getTime() - new Date().getTime();
        let s = Math.floor(Math.max(0, ms / 1000));
        this.remaindTime = s.toString();
    }
    get actionName() {
        return src_app_service_websocket_websocket_schema__WEBPACK_IMPORTED_MODULE_0__["ActionDisplayName"][this.action];
    }
    reset() {
        this.result = initResult;
        for (const betArea of this.betAreaList) {
            betArea.amount = 0;
            betArea.isWin = false;
        }
    }
}
var AllBetArea;
(function (AllBetArea) {
    AllBetArea[AllBetArea["Left"] = 1] = "Left";
    AllBetArea[AllBetArea["Right"] = 2] = "Right";
    AllBetArea[AllBetArea["Tie"] = 3] = "Tie";
})(AllBetArea || (AllBetArea = {}));
const AllBetAreaId = Object.keys(AllBetArea).filter(value => !isNaN(Number(value)));
const BetAreaNameMap = {
    [AllBetArea.Left]: '1比較大',
    [AllBetArea.Right]: '2比較大',
    [AllBetArea.Tie]: '和',
};
class BetAreaViewModel {
    constructor(id) {
        this.id = id;
        this.amount = 0;
        this.isWin = false;
    }
    get displayName() {
        return BetAreaNameMap[this.id];
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





function RoomComponent_ng_container_0_ng_container_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const info_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](info_r3);
} }
function RoomComponent_ng_container_0_ng_container_14_label_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const betArea_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u9EDE\u6578:", betArea_r4.point, "");
} }
function RoomComponent_ng_container_0_ng_container_14_label_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "WIN");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function RoomComponent_ng_container_0_ng_container_14_label_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "_");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function RoomComponent_ng_container_0_ng_container_14_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function RoomComponent_ng_container_0_ng_container_14_Template_div_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r10); const betArea_r4 = ctx.$implicit; const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r9.areaClick.emit(betArea_r4); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, RoomComponent_ng_container_0_ng_container_14_label_8_Template, 2, 1, "label", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, RoomComponent_ng_container_0_ng_container_14_label_10_Template, 2, 0, "label", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, RoomComponent_ng_container_0_ng_container_14_label_11_Template, 2, 0, "label", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const betArea_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u4E0B\u6CE8\u5340:", betArea_r4.displayName, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u58D3\u6CE8:", betArea_r4.amount, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", betArea_r4.point !== 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", betArea_r4.isWin);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !betArea_r4.isWin);
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
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "\u7D50\u679C:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, RoomComponent_ng_container_0_ng_container_13_Template, 4, 1, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, RoomComponent_ng_container_0_ng_container_14_Template, 12, 5, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u623F\u540D: ", ctx_r0.viewModel.name, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u52D5\u4F5C: ", ctx_r0.viewModel.actionName, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u5012\u6578: ", ctx_r0.viewModel.remaindTime, "\u79D2");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.viewModel.result);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
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
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, RoomComponent_ng_container_0_Template, 16, 5, "ng-container", 0);
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

/***/ "UU5k":
/*!********************************************!*\
  !*** ./src/app/service/api/api.service.ts ***!
  \********************************************/
/*! exports provided: ApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiService", function() { return ApiService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _api_schema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api.schema */ "vCJH");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "IheW");





class ApiService {
    // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
    constructor(http) {
        this.http = http;
        // private host = `http://123.193.145.165:1002`
        this.host = `http://${document.location.host}`;
    }
    // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
    // present
    fullURL(command) {
        let path = [this.host, command].map(ele => removeTrailingSlash(ele));
        return path.join('/');
    }
    // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
    // action
    guestLogin() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return this.convenientGet(this.fullURL('guestLogin'));
        });
    }
    bet(token, room_id, area, amount) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const headers = {
                token,
            };
            const body = {
                room_id,
                area,
                amount,
            };
            return this.convenientPost(this.fullURL('bet'), body, headers);
        });
    }
    // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
    convenientGet(path, waitTime = 1500) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const res = yield this.http.get(path, { responseType: 'text' }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["timeout"])(waitTime))
                .toPromise()
                .catch(this.handleError);
            return res;
        });
    }
    convenientPost(path, body = {}, headers = {}, waitTime = 1500) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const res = yield this.http.post(path, body, { headers }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["timeout"])(waitTime))
                .toPromise()
                .catch(this.handleError);
            return res;
        });
    }
    handleError(error) {
        console.log('api error', error);
        return Promise.resolve(new _api_schema__WEBPACK_IMPORTED_MODULE_2__["ErrorResponse"](error));
    }
}
ApiService.ɵfac = function ApiService_Factory(t) { return new (t || ApiService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"])); };
ApiService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: ApiService, factory: ApiService.ɵfac, providedIn: 'root' });
function removeTrailingSlash(str) {
    return str.replace(/\/+$/, '');
}


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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_service_websocket_websocket_schema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/service/websocket/websocket.schema */ "kxLR");
/* harmony import */ var _lobby_viewmodel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lobby.viewmodel */ "rrY1");
/* harmony import */ var _component_room_room_viewmodel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../component/room/room.viewmodel */ "A5Eh");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_service_api_api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/service/api/api.service */ "UU5k");
/* harmony import */ var src_app_service_websocket_websocket_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/service/websocket/websocket.service */ "+Dqb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _component_room_room_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../component/room/room.component */ "FPj7");









function LobbyComponent_ng_container_0_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "button", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function LobbyComponent_ng_container_0_ng_container_4_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r4); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2); return ctx_r3.startConnect(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "\u9023\u7DDA");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
} }
function LobbyComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "button", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function LobbyComponent_ng_container_0_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r6); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r5.login(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "\u767B\u5165");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, LobbyComponent_ng_container_0_ng_container_4_Template, 3, 0, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.viewModel.token);
} }
function LobbyComponent_ng_container_1_ng_container_7_label_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function LobbyComponent_ng_container_1_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "button", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function LobbyComponent_ng_container_1_ng_container_7_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r12); const point_r9 = ctx.$implicit; const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2); return ctx_r11.viewModel.selectPoint = point_r9; });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, LobbyComponent_ng_container_1_ng_container_7_label_2_Template, 2, 0, "label", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const point_r9 = ctx.$implicit;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r7.viewModel.selectPoint === point_r9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", point_r9, " ");
} }
function LobbyComponent_ng_container_1_ng_container_9_Template(rf, ctx) { if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "app-room", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("areaClick", function LobbyComponent_ng_container_1_ng_container_9_Template_app_room_areaClick_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r15); const room_r13 = ctx.$implicit; const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2); return ctx_r14.areaClick(room_r13, $event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const room_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("viewModel", room_r13);
} }
function LobbyComponent_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](6, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, LobbyComponent_ng_container_1_ng_container_7_Template, 4, 2, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](8, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](9, LobbyComponent_ng_container_1_ng_container_9_Template, 2, 1, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("\u4F7F\u7528\u8005:", ctx_r1.viewModel.userName, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("\u9918\u984D:", ctx_r1.viewModel.balance, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r1.viewModel.optionalPoint);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r1.viewModel.roomList);
} }
class LobbyComponent {
    // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
    constructor(api, websocket) {
        this.api = api;
        this.websocket = websocket;
        this.viewModel = new _lobby_viewmodel__WEBPACK_IMPORTED_MODULE_2__["LobbyViewModel"]();
    }
    ngOnInit() {
    }
    // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
    login() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let res = yield this.api.guestLogin();
            this.viewModel.token = res;
        });
    }
    startConnect() {
        if (!this.websocket.conn) {
            this.websocket.startConnect(this.viewModel.token);
            this.websocket.onMessage$.subscribe((event) => {
                if (event.cmd === src_app_service_websocket_websocket_schema__WEBPACK_IMPORTED_MODULE_1__["DemoCmd"].game_player_info) {
                    console.log(`使用者:${event.user_name},餘額:${event.balance}`);
                    this.viewModel.userName = event.user_name;
                    this.viewModel.balance = event.balance;
                }
                else if (event.cmd === src_app_service_websocket_websocket_schema__WEBPACK_IMPORTED_MODULE_1__["DemoCmd"].game_room_list) {
                    for (const info of event.room_list) {
                        // 檢查並建立房間
                        this.roomDataUpdate(info);
                    }
                }
                else if (event.cmd === src_app_service_websocket_websocket_schema__WEBPACK_IMPORTED_MODULE_1__["DemoCmd"].game_state) {
                    // 檢查並建立房間
                    this.roomDataUpdate(event);
                }
                else if (event.cmd === src_app_service_websocket_websocket_schema__WEBPACK_IMPORTED_MODULE_1__["DemoCmd"].bet) {
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
                else if (event.cmd === src_app_service_websocket_websocket_schema__WEBPACK_IMPORTED_MODULE_1__["DemoCmd"].game_result) {
                    console.log(`結算資料:${JSON.stringify(event.obj, null, 2)}`);
                    this.viewModel.balance = event.balance;
                    let room_id = event.obj['room_id'];
                    let room = this.viewModel.roomList.find(ele => ele.name === room_id);
                    if (room) {
                        room.result.push(`總輸贏:${event.obj['win_amount']}`);
                    }
                    else {
                        console.log('找不到', room_id);
                    }
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
    roomDataUpdate(info) {
        // console.log(info)
        // console.log(`房間:${info.room_name},動作:${info.action},資料:${JSON.stringify(info.data)}`)
        let roon_id = info.room_name || info.room_id;
        let data = info.data || info.status;
        { // 檢查創建
            let room = this.viewModel.roomList.find(ele => ele.name === roon_id);
            if (!room) {
                let newRoom = new _component_room_room_viewmodel__WEBPACK_IMPORTED_MODULE_3__["RoomViewModel"]();
                newRoom.name = roon_id;
                this.viewModel.roomList.push(newRoom);
            }
        }
        { // 更新房間資料
            let room = this.viewModel.roomList.find(ele => ele.name === roon_id);
            if (room) {
                room.action = info.action;
                if (data && data.seconds) {
                    room.targetTime = new Date(new Date().getTime() + data.seconds * 1000);
                }
                if (info.action === src_app_service_websocket_websocket_schema__WEBPACK_IMPORTED_MODULE_1__["DemoRoomAction"].start_bet) {
                    room.reset();
                }
                else if (info.action === src_app_service_websocket_websocket_schema__WEBPACK_IMPORTED_MODULE_1__["DemoRoomAction"].result) {
                    let result = [];
                    let pointDict = data.point;
                    for (const idStr in pointDict) {
                        const point = pointDict[idStr];
                        let id = parseInt(idStr);
                        result.push(`[${id}] 開 [${point}點]`);
                    }
                    let win_area = data.win_area;
                    for (const betArea of room.betAreaList) {
                        betArea.isWin = (betArea.id === win_area);
                    }
                    room.result = result;
                }
            }
        }
    }
    areaClick(room, betArea) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            // console.log(room, betArea)
            let res = yield this.api.bet(this.viewModel.token, room.name, betArea.id, this.viewModel.selectPoint);
            // console.log(res)
            // {
            //   "bet_info": {
            //       "room_id": "r1",
            //       "area": 1,
            //       "amount": "50"
            //   },
            //   "balance": "950",
            //   "user_total_bet": {
            //       "area1": "50",
            //       "area2": "0",
            //       "area3": "0"
            //   },
            //   "error_message": ""
            // }
            if (res.error_message) {
                return;
            }
            this.viewModel.balance = res.balance;
            let user_total_bet = res.user_total_bet;
            for (const betArea of room.betAreaList) {
                let key = `area${betArea.id}`;
                betArea.amount = user_total_bet[key];
            }
        });
    }
}
LobbyComponent.ɵfac = function LobbyComponent_Factory(t) { return new (t || LobbyComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_service_api_api_service__WEBPACK_IMPORTED_MODULE_5__["ApiService"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_service_websocket_websocket_service__WEBPACK_IMPORTED_MODULE_6__["WebsocketService"])); };
LobbyComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: LobbyComponent, selectors: [["app-lobby"]], decls: 2, vars: 2, consts: [[4, "ngIf"], [3, "click"], [4, "ngFor", "ngForOf"], [3, "viewModel", "areaClick"]], template: function LobbyComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](0, LobbyComponent_ng_container_0_Template, 5, 1, "ng-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, LobbyComponent_ng_container_1_Template, 10, 4, "ng-container", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx.viewModel.userName);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.viewModel.userName);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_7__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgForOf"], _component_room_room_component__WEBPACK_IMPORTED_MODULE_8__["RoomComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJsb2JieS5jb21wb25lbnQuc2NzcyJ9 */"] });


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
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "IheW");
/* harmony import */ var _service_api_api_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./service/api/api.service */ "UU5k");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ "fXoL");









class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [
        _service_api_api_service__WEBPACK_IMPORTED_MODULE_7__["ApiService"],
        _service_websocket_websocket_service__WEBPACK_IMPORTED_MODULE_4__["WebsocketService"],
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_1__["AppRoutingModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
        _page_lobby_lobby_component__WEBPACK_IMPORTED_MODULE_3__["LobbyComponent"],
        _component_room_room_component__WEBPACK_IMPORTED_MODULE_5__["RoomComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"],
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
    DemoCmd["game_room_list"] = "game_room_list";
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
    get room_list() {
        return this.obj.room_list;
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
        this.token = '';
        this.userName = '';
        this.balance = '';
        this.selectPoint = 50;
        this.optionalPoint = [50, 100, 150, 200];
        this.roomList = [];
    }
}


/***/ }),

/***/ "vCJH":
/*!*******************************************!*\
  !*** ./src/app/service/api/api.schema.ts ***!
  \*******************************************/
/*! exports provided: BaseAPIResponse, ErrorResponse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseAPIResponse", function() { return BaseAPIResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorResponse", function() { return ErrorResponse; });
class BaseAPIResponse {
    constructor(params) {
        this.Message = '';
        Object.assign(this, params);
    }
}
class ErrorResponse extends BaseAPIResponse {
    constructor(params) {
        super(params);
        this.Message = params.message;
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