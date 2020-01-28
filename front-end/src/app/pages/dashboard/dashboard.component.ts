import { Component, OnInit } from '@angular/core';
import { NewticketService } from 'src/app/services/newticket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private ticketServie: NewticketService) { }

  ngOnInit() {
    // this.getTicketByIdFn(1);
  }

  getTicketByIdFn(id: any) {
    this.ticketServie.getTicketById(id).subscribe(data => {
      console.log('Ticket Detail: ' + data);
    });
  }
}
