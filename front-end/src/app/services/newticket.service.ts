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
    if (typeof ticket.assignedToUserId !== 'undefined' && typeof ticket.assignedToUserId === 'string') {
      ticket.assignedToUserId = parseInt(ticket.assignedToUserId);
    }
    return this.http.post<any>(this.url + 'ticket/', ticket, { headers: this.header });
  }

  getTicketById(id: any) {
    return this.http.get<any>(this.url + 'ticket/' + id + '/?filter[include][][relation]=comments', { headers: this.header });
  }

  postCommentService(comment: any) {
    if (typeof comment.userId !== 'undefined' && typeof comment.userId === 'string') {
      comment.userId = parseInt(comment.userId, null);
    }
    console.log('Comment::::::' + JSON.stringify(comment));
    return this.http.post<any>(this.url + 'comments', comment, { headers: this.header });
  }

  getTickets() {
    return this.http.get<any>(this.url + 'ticket/?filter[include][][relation]=comments', { headers: this.header });
  }
}

