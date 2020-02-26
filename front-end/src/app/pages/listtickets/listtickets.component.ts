import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-listtickets',
  templateUrl: './listtickets.component.html',
  styleUrls: ['./listtickets.component.css']
})
export class ListticketsComponent implements OnInit {

  constructor(private ticketServie: TicketService,
    private route: ActivatedRoute, private router: Router) {
    router.events.subscribe((val: any) => {
      if (typeof (val.url) !== 'undefined' && val.url.indexOf("tickets") > 0) {
        var url = val.url.split('/')[2];
        this.type = url;
        this.getData();
      }
    });
  }

  private type: string = "";
  tickets: any = [];

  ngOnInit() {
    this.type = this.route.snapshot.paramMap.get('type');
    this.getData();
  }

  getData() {
    if (this.type === "New")
      this.getNewTicket();
    else if (this.type === "InProcess")
      this.getProcessingTicket();
    else if (this.type === "Testing")
      this.getTestingTicket();
    else if (this.type === "Completed")
      this.getCompleteTicket();
    else if (this.type === "Cancelled")
      this.getCancelledTicket();
    else if (this.type === "ATM")
      this.getATMTicket(localStorage.getItem('userId'));
    else if (this.type === "ABM")
      this.getABMTicket(localStorage.getItem('userId'));
    // else {
    //   this.getAllTickets();
    // }
  }

  getAllTickets() {
    this.ticketServie.getTickets().subscribe(data => {
      this.tickets = data;
    });
  }

  getCompleteTicket() {
    this.ticketServie.getCompleteTicket().subscribe(data => {
      this.tickets = data;
    });
  }

  getCancelledTicket() {
    this.ticketServie.getCancelledTicket().subscribe(data => {
      this.tickets = data;
    });
  }


  getProcessingTicket() {
    this.ticketServie.getInProcessTicket().subscribe(data => {
      this.tickets = data;
    });
  }


  getNewTicket() {
    this.ticketServie.getNewTicket().subscribe(data => {
      this.tickets = data;
    });
  }

  getABMTicket(id) {
    this.ticketServie.getABMTicket(id).subscribe(data => {
      this.tickets = data;
    });
  }

  getATMTicket(id) {
    this.ticketServie.getATMTicket(id).subscribe(data => {
      this.tickets = data;
    });
  }
  getTestingTicket() {
    this.ticketServie.getTestingTicket().subscribe(data => {
      this.tickets = data;
    });
  }

}
