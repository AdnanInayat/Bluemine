import { Component, OnInit } from '@angular/core';
import { NewticketService } from 'src/app/services/newticket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    
  tickets: any = []
  constructor(private ticketServie: NewticketService) { }

  ngOnInit() {
    this.getAllTickets();
  }

  getAllTickets() {
    this.ticketServie.getTickets().subscribe(data => {
      this.tickets = data;
      console.log('Ticket Detail: ' + JSON.stringify(data));
    });
  }
}
