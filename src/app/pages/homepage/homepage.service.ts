import { Injectable } from '@angular/core';
import { HttpHeaders } from "@angular/common/http";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  url :string;  
  token : string;
  header : any;  

  constructor(private http: HttpClient) {

    this.url = 'http://localhost:5000/users/login';
    const headerSettings: {[name: string]: string | string[]; } = {};  
    this.header = new HttpHeaders(headerSettings); 

   }

   Login(model : any) {  
    //debugger;  
     console.log(model); 
      return this.http.post<any>(this.url, model, { headers: this.header }); 
  }  
}
