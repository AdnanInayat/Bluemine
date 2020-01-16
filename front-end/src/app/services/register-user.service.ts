import { Injectable } from '@angular/core';
import { User } from '../model';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService extends MainService {

  constructor(private http: HttpClient) {
    super();
    this.url += 'users/signup';
   }

  register(user: any) {
    console.log(user);
    return this.http.post<any>(this.url, user, { headers: this.header });
  }
}
