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
    this.token = localStorage.getItem('userToken');
   }

   newTicket(ticket: any) {    
   //console.log("token from service", httpOptions);
      this.token = localStorage.getItem("userToken");
      this.header = this.header.append("Authorization", "Bearer " + this.token);
      if(typeof ticket.assignedTo !== 'undefined' && typeof ticket.assignedTo === "string"){
        ticket.assignedTo = parseInt(ticket.assignedTo);
      }
    return this.http.post<any>(this.url, ticket, { headers: this.header});
  }

}
