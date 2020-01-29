import { Component, OnInit } from '@angular/core';
import { NewticketService } from 'src/app/services/newticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private ticketServie: NewticketService, private router: Router) { }

  ngOnInit() {
    this.getTicketByIdFn(1);
  }

  getTicketByIdFn(id: any) {
    // const id = 1;
    this.ticketServie.getTicketById(id).subscribe(data => {
      console.log('Ticket Detail: ' + JSON.stringify(data));
      // this.router.nav
    });
  }
}
