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

  data$: any = [];
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
      this.data$ = data;
      console.log('Ticket Detail: ' + JSON.stringify(data));
      // this.router.nav
    });
    //   this.data$ = this.ticket.getTicketById(id);
    //   console.log('Data: ' + JSON.stringify(this.data$));
  }

  postComment() {
    this.comment.ticketId = this.data$.id;
    this.comment.userId = localStorage.getItem('userId');
    // console.log('Comment: ' + JSON.stringify(this.comment));
    this.ticket.postCommentService(this.comment).subscribe(data => {
      // console.log('Comment posted. ' + JSON.stringify(data));
      this.data$.comments.push(data);
      console.log('Comments. ' + JSON.stringify(this.data$.comments));
      this.comment.body = '';
    });
  }
}
