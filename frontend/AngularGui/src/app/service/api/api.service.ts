import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timeout } from 'rxjs/operators';
import { BaseAPIResponse, ErrorResponse } from './api.schema';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private host = `http://123.193.145.165:1002`
  // private host = `ws://${document.location.host}/ws`

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  constructor(
    private http: HttpClient,
  ) { }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
  // present
  private fullURL(command: string): string {
    let path = [this.host, command].map(ele => removeTrailingSlash(ele))
    return path.join('/');
  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
  // action

  async guestLogin() {
    return this.convenientGet<any>(this.fullURL('guestLogin'));
  }

  async bet(token: string, room_id: string, area: number, amount: number) {
    const headers  = {
      token,
    }
    const body = {
      room_id,
      area,
      amount,
    }
    return this.convenientPost<any>(this.fullURL('bet'), body, headers);
  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
  private async convenientGet<resType = object>(
    path: string,
    waitTime: number = 1500,
  ): Promise<resType> {

    const res = await this.http.get(path, {responseType: 'text'}).pipe(timeout(waitTime))
      .toPromise()
      .catch(this.handleError);

    return res;
  }

  private async convenientPost<resType = object>(
    path: string,
    body: any = {},
    headers: any = {},
    waitTime: number = 1500,
  ): Promise<resType> {

    const res = await this.http.post(path, body, { headers }).pipe(timeout(waitTime))
      .toPromise()
      .catch(this.handleError);

    return res;
  }

  private handleError(error: any): Promise<any> {
    console.log('api error', error);
    return Promise.resolve(new ErrorResponse(error));
  }
}

function removeTrailingSlash(str) {
  return str.replace(/\/+$/, '');
}

