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
   }

  register(user: any) {
    console.log(user);
    // this.url += 'users/signup';
    return this.http.post<any>(this.url+'users/signup', user, { headers: this.header });
  }

  getUsers(){
    // this.url += 'users/dd';
    return this.http.get<any>(this.url+'users/dd', { headers: this.header });

  }

  userProfile(){

    this.token = localStorage.getItem("userToken");
    this.header = this.header.append("Authorization", "Bearer " + this.token);
    return this.http.get<any>(this.url+'users/me',{ headers: this.header});
  }

}
