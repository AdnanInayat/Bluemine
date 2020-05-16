import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthmainService } from './authmain.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService extends AuthmainService {

  constructor(private http: HttpClient) {

    super();

    this.token = localStorage.getItem('userToken');
  }

  newTicket(ticket: any) {
    if (typeof ticket.assignedToUserId !== 'undefined' && typeof ticket.assignedToUserId === 'string') {
      ticket.assignedToUserId = parseInt(ticket.assignedToUserId);
    }
    return this.http.post<any>(this.url + 'ticket/', ticket, { headers: this.header });
  }

  getTicketById(id: any) {
    return this.http.get<any>(this.url + 'ticket/' + id + '/?filter[include][][relation]=comments', { headers: this.header });
  }

  getABMTicket(id: any) {
    return this.http.get<any>(this.url + 'ticket/?filter[where][assignedByUserId]=' + id, { headers: this.header });
  }

  getATMTicket(id: any) {
    return this.http.get<any>(this.url + 'ticket/?filter[where][assignedToUserId]=' + id, { headers: this.header });
  }

  postCommentService(comment: any) {
    if (typeof comment.userId !== 'undefined' && typeof comment.userId === 'string') {
      comment.userId = parseInt(comment.userId, null);
    }
    console.log('Comment::::::' + JSON.stringify(comment));
    return this.http.post<any>(this.url + 'comments', comment, { headers: this.header });
  }

  getTickets() {
    return this.http.get<any>(this.url + 'ticket/', { headers: this.header });
  }

  getCompleteTicket() {
    return this.http.get<any>(this.url + 'ticket?filter[where][status]=Completed', { headers: this.header });

  }

  getCancelledTicket() {
    return this.http.get<any>(this.url + 'ticket?filter[where][status]=Cancelled', { headers: this.header });

  }
  getInProcessTicket() {
    return this.http.get<any>(this.url + 'ticket?filter[where][status]=InProcess', { headers: this.header });

  }
  getNewTicket() {
    return this.http.get<any>(this.url + 'ticket?filter[where][status]=New', { headers: this.header });
  }

  getTCByStatusAndId(tStatus,userId) {
    return this.http.get<any>(this.url + 'ticket/count?where[assignedToUserId]='+userId+'&where[status]='+tStatus, { headers: this.header });
  }

  getTCByStatus(tStatus) {
    return this.http.get<any>(this.url + 'ticket/count?where[status]='+tStatus, { headers: this.header });
  }

  getTestingTicket() {
    return this.http.get<any>(this.url + 'ticket?filter[where][status]=Testing', { headers: this.header });
  }
  getTicketsCountService() {
    return this.http.get<any>(this.url + 'ticket/count', { headers: this.header });
  }
  getUserTickets(id){
    return this.http.get<any>(this.url + `ticket?filter[where][or][0][assignedByUserId]=${id}&filter[where][or][1][assignedToUserId]=${id}`, { headers: this.header });
  }
  updateTicket(data){
    return this.http.put<any>(this.url + `ticket/${data.id}`, data, { headers: this.header });
  }
}

