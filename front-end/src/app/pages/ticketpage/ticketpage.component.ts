import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { NewticketService } from 'src/app/services/newticket.service';
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
    private ticket: NewticketService
  ) { }

  ngOnInit() {
    //   this.data$ = this.route.paramMap.pipe(
    //     switchMap((params: ParamMap) =>
    //       this.ticket.getTicketById(params.get('id')))
    //   );
    //   console.log('Received data: ' + JSON.stringify(this.data$));
    // }
    const id = this.route.snapshot.paramMap.get('id');
    this.ticket.getTicketById(id).subscribe(data => {
      this.ticket$ = data;
      console.log('Ticket Detail: ' + JSON.stringify(data));
      console.log('Comments Detail: ' + JSON.stringify(data.comments));
      // this.router.nav
    });
    //   this.data$ = this.ticket.getTicketById(id);
    //   console.log('Data: ' + JSON.stringify(this.data$));
  }

  postComment() {
    this.comment.ticketId = this.ticket$.id;
    this.comment.userId = localStorage.getItem('userId');
    if (this.ticket$.comments === undefined) {
      console.log('true : not defined');
      this.ticket$.setItem('comment', this.comment);
    } else {
      console.log('true : defined');
    }
    // this.ticket.postCommentService(this.comment).subscribe(data => {
    //   if (this.comment !== undefined) {
    //     this.data$.comments.push(data);
    //   } else {
    //     this.data$.comments = data;
    //   }
    //   this.comment.body = data.body;
    //   console.log('Comments. ' + JSON.stringify(this.data$.comments));
    //   this.comment.body = '';
    // });
  }
}
