import { Component, OnInit } from '@angular/core';
import { NewticketService } from 'src/app/services/newticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tickets: any = [];
  constructor(private ticketServie: NewticketService) { }

  ngOnInit() {
    this.getAllTickets();
  }

  getAllTickets() {
    this.ticketServie.getTickets().subscribe(data => {
      this.tickets  = data;
      this.tickets.reverse();
      

      console.log('Ticket Detail: ' + JSON.stringify(data));
    });
  }
}
