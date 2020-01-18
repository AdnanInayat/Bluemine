import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewticketService extends MainService {
  
  constructor(private http: HttpClient) {
    
    super();
    this.url += 'ticket';
    
   }

   newTicket(ticket: any) {
    let token = localStorage.getItem('userToken');
    console.log(token);      

    return this.http.post<any>(this.url, ticket, { headers: this.header });
  }

}
