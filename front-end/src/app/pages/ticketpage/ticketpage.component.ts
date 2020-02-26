import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-ticketpage',
  templateUrl: './ticketpage.component.html',
  styleUrls: ['./ticketpage.component.css']
})
export class TicketpageComponent implements OnInit {

  ticket$: any = [];
  comment: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticket: TicketService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.ticket.getTicketById(id).subscribe(data => {
      this.ticket$ = data;
      console.log('Ticket Detail: ' + JSON.stringify(data));
      console.log('Comments Detail: ' + JSON.stringify(data.comments));
    });
  }

  postComment() {
    this.comment.ticketId = this.ticket$.id;
    this.comment.userId = localStorage.getItem('userId');
      this.ticket.postCommentService(this.comment).subscribe(data => {
          this.comment.body = data.body;
          this.ticket.getTicketById(this.ticket$.id).subscribe(data => {
            this.ticket$ = data;})
          this.comment.body = '';
        });
  }
  
}
