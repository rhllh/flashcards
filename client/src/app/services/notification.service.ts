import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private token: any;
  private message: any;

  get tokenValue() {
    return this.token;
  }

  set tokenValue(obj) {
    this.token = obj;
  }

  get messageValue() {
    return this.message;
  }

  set messageValue(obj) {
    this.message = obj;
  }

  constructor(private http: HttpClient) { }

}
