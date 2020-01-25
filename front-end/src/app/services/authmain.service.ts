import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthmainService {
  
    url: string;
    token: string;
    header: any;

  constructor() {

        this.url = 'http://localhost:5000/';
        this.token = localStorage.getItem("userToken");
        const headerSettings: { [name: string]: string | string[]; } = {};
        this.header = new HttpHeaders(headerSettings);
        this.header = this.header.append("Authorization", "Bearer " + this.token);
        
   }
}
