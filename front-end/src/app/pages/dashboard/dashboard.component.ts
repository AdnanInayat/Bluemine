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
  constructor(private ticketServie: NewticketService, private router: Router) { }
//1. access specifier -> private, public, protected
//2. name of variable (ticketService)
//3. type of variable (NewticketService)
  ngOnInit() {
    this.getAllTickets();
    this.getTicketsCount();
  }

  getAllTickets() {
    this.ticketServie.getTickets().subscribe(data => {
      this.tickets = data;
      console.log('related comments : ' + this.tickets.comments);
      console.log('Ticket Detail: ' + JSON.stringify(data));
    });
  }
  getCompleteTicket() {
    this.ticketServie.getCompleteTicket().subscribe(data => {
      this.tickets = data;
      console.log('Comppleting Tickets ' + JSON.stringify(data));
    });
  }

  
  getProcessingTicket() {
    this.ticketServie.getProcessingTicket().subscribe(data => {
      this.tickets = data;
      console.log('Processing Ticket  ' + JSON.stringify(data));
    });
  }

   
  getNewTicket() {
    this.ticketServie.getNewTicket().subscribe(data => {
      this.tickets = data;
      console.log('New Tickets' + JSON.stringify(data));
    });
  }

  getTestingTicket() {
    this.ticketServie.getTestingTicket().subscribe(data => {
      this.tickets = data;
      console.log('Testing Tickets ' + JSON.stringify(data));
    });
  }

  
  test(id) {
    this.router.navigate(['ticket/' + id]);
    console.log( id);
  }

  getTicketsCount() {
    this.ticketServie.getTicketsCountService().subscribe(total => {
      console.log('Total tickets are : ' + JSON.stringify(total));
    });
  }
} 
