import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private sharingObject: any;
  private isLoggedIn: any;
  
  constructor(private http: HttpClient) { }

  get sharingValue() {
    return this.sharingObject
  }

  set sharingValue(obj) {
    this.sharingObject = obj;
  }

  get isLoggedInValue() {
    return this.isLoggedIn;
  }

  set isLoggedInValue(obj) {
    this.isLoggedIn = obj;
  }

  validateUser(user: User): Promise<any> {
    return lastValueFrom(
      this.http.post<any>(`https://rhllh-flashcards.up.railway.app/api/auth/validate`, user)
    );
  }

  createUser(user: User): Promise<any> {
    return lastValueFrom(
      this.http.post<any>(`https://rhllh-flashcards.up.railway.app/api/auth/create`, user)
    );
  }
}