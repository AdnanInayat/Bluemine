import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewticketService extends MainService {
  
  constructor(private http: HttpClient) {
    
    super();
    
    this.token = localStorage.getItem('userToken');
   }

   newTicket(ticket: any) {    
    this.url += 'ticket';
   //console.log("token from service", httpOptions);
      this.token = localStorage.getItem("userToken");
      this.header = this.header.append("Authorization", "Bearer " + this.token);
      if(typeof ticket.assignedToUserId !== 'undefined' && typeof ticket.assignedToUserId === "string"){
        ticket.assignedToUserId = parseInt(ticket.assignedToUserId);
      }
    return this.http.post<any>(this.url, ticket, { headers: this.header});
  }

}
