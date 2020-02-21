import { Component, OnInit } from '@angular/core';
import { NewticketService } from 'src/app/services/newticket.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title = 'App';
  // public pieChartLabels: string[] = ['Pending', 'InProgress', 'OnHold', 'Completed', 'Cancelled'];
  public pieChartLabels: string[] = ['New', 'InProgress', 'Testing', 'Completed', 'Cancelled'];
  public pieChartData: number[] = [21, 39, 10, 14, 16];
  public pieChartType: string = 'pie';
  public pieChartOptions = [{ backgroundColor: ['#17A2B8', '#FFC107', '#6C757D', '#28A745', '#DC3545'] }];


  tickets: any = [];

  constructor(private ticketServie: NewticketService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit() {
    const type = this.route.snapshot.paramMap.get('type');
    console.log("clicked on : " + type);
    if (type==="New") 
    this.getNewTicket();
    else if(type==="InProcess")
    this.getProcessingTicket();
    else if (type==="Testing")
    this.getTestingTicket();
    else if (type==="Completed")
    this.getCompleteTicket();
    else if (type==="Cancelled")
    this.getCancelledTicket();

    else{
      this.getAllTickets();
      this.getTicketsCount();
    }
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

getCancelledTicket() {
    this.ticketServie.getCancelledTicket().subscribe(data => {
      this.tickets = data;
      console.log('Cancelled Tickets ' + JSON.stringify(data));
    });
  }

  
  getProcessingTicket() {
    this.ticketServie.getInProcessTicket().subscribe(data => {
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
   
  getABMTicket(id) {
    this.ticketServie.getABMTicket(id).subscribe(data => {
      this.tickets = data;
      console.log('Processing Ticket  ' + JSON.stringify(data));
    });
  }
  
  getATMTicket(id) {
    this.ticketServie.getATMTicket(id).subscribe(data => {
      this.tickets = data;
      console.log('Processing Ticket  ' + JSON.stringify(data));
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
    console.log(id);
  }

  getTicketsCount() {
    this.ticketServie.getTicketsCountService().subscribe(total => {
      console.log('Total tickets are : ' + JSON.stringify(total));
    });
  }

  // events on slice click
  public chartClicked(e: any): void {
    console.log(e);
  }

  // event on pie chart slice hover
  public chartHovered(e: any): void {
    console.log(e);
  }
}
