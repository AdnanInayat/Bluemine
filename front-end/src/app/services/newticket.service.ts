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
    this.token=localStorage.getItem('userToken');
   }

   newTicket(ticket: any) {
    let token = localStorage.getItem('userToken');
    
   //console.log("token from service", httpOptions);
      

    return this.http.post<any>(this.url, ticket, { headers: this.header.append('userToken', 'Bearer ' + token) });
  }

}
