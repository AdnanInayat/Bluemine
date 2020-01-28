import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthmainService } from './authmain.service';

@Injectable({
  providedIn: 'root'
})
export class NewticketService extends AuthmainService {

  constructor(private http: HttpClient) {

    super();

    this.token = localStorage.getItem('userToken');
  }

  newTicket(ticket: any) {
    // this.url += 'ticket';
    if (typeof ticket.assignedToUserId !== 'undefined' && typeof ticket.assignedToUserId === 'string') {
      ticket.assignedToUserId = parseInt(ticket.assignedToUserId);
    }
    return this.http.post<any>(this.url + 'ticket/' , ticket, { headers: this.header });
  }

  getTicketById(id: any) {
    return this.http.get<any>(this.url + 'ticket/' + id, { headers: this.header });
  }

  getTickets(){
    return this.http.get<any>(this.url + 'ticket/', { headers: this.header});
  }
}

