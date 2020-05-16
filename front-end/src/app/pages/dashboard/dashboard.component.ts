import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pieTitle = 'Tickets Overview';
  // public pieChartLabels: string[] = ['Pending', 'InProgress', 'OnHold', 'Completed', 'Cancelled'];
  public pieChartLabels: string[] = ['New', 'InProgress', 'Testing', 'Completed', 'Cancelled'];
  // public pieChartData: number[] = [21, 39, 10, 14, 16];
  public pieChartData: number[] = [];
  public pieChartType: string = 'pie';
  public pieChartOptions = [{ backgroundColor: ['#17A2B8', '#FFC107', '#6C757D', '#28A745', '#DC3545'] }];

  lineTitle = 'Current Year Performance';
  lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June'];
  lineChartData = [
    { data: [33, 60, 26, 20], label: 'New' },
    { data: [12, 45, 10, 34], label: 'InProcess' },
    { data: [45, 57, 20, 50], label: 'Testing' },
    { data: [5, 17, 50, 40], label: 'Completed' },
    { data: [5, 7, 2, 3], label: 'Cancelled' }
  ];
  public lineChartColors = [
    { borderColor: '#17A2B8', borderWidth: '2.0', backgroundColor: 'rgba(0,0,0,0.1)', },
    { borderColor: '#FFC107', borderWidth: '1.4', backgroundColor: 'rgba(0,0,0,0.03)', },
    { borderColor: '#6C757D', borderWidth: '1.6', backgroundColor: 'rgba(0,0,0,0.05)', },
    { borderColor: '#28A745', borderWidth: '1.8', backgroundColor: 'rgba(0,0,0,0.07)', },
    { borderColor: '#DC3545', borderWidth: '1.2', backgroundColor: 'rgba(0,0,0,0.09)', },
  ];
  public lineChartType: string = 'line';
  public lineChartOptions = [{responsive: true }];

  private _New: Array<any>;
  private _InProcess: Array<any>;
  private _Testing: Array<any>;
  private _Complete: Array<any>;
  private _Cancel: Array<any>;

  constructor(private ticketServie: TicketService,
    private route: ActivatedRoute, private router: Router) {
    this.getUserTickets();
  }
  
  ngOnInit() {
    this.getTicketsCount();
  }
  
  test(id) {
    this.router.navigate(['ticket/' + id]);
  }
  
  getUserTickets() {
    let _userId = localStorage.getItem("userId");
    if (typeof _userId !== 'undefined') {
      let uid = parseInt(_userId);
      this.ticketServie.getUserTickets(uid).subscribe(tickets => {
        this._New = tickets.filter((elem) => {
          return (elem.status == "New");
        });
        this._Testing = tickets.filter((elem) => {
          return (elem.status == "Testing");
        });
        this._InProcess = tickets.filter((elem) => {
          return (elem.status == "InProcess");
        });
        this._Complete = tickets.filter((elem) => {
          return (elem.status == "Completed");
        });
        this._Cancel = tickets.filter((elem) => {
          return (elem.status == "Cancelled");
        });
      });
    }
  }

  // events on slice click
  public chartClicked(e: any): void {
    console.log(e);
  }

  // event on pie chart slice hover
  public chartHovered(e: any): void {
    console.log(e);
  }

  getTicketsCount(){
    this.pieChartData=[];
    this.ticketServie.getTCByStatus('New').subscribe(res => {this.pieChartData.push(res.count);});
    this.ticketServie.getTCByStatus('InProcess').subscribe(res => {this.pieChartData.push(res.count);});
    this.ticketServie.getTCByStatus('Testing').subscribe(res => {this.pieChartData.push(res.count);});
    this.ticketServie.getTCByStatus('Completed').subscribe(res => {this.pieChartData.push(res.count);});
    this.ticketServie.getTCByStatus('Cancelled').subscribe(res => {this.pieChartData.push(res.count);});
  }
  
  public updateStatuses(){
    for(let item of this._New){
      item.status = "New";
      this.ticketServie.updateTicket(item).subscribe(data => {
        this.getUserTickets();
      });
    }
    for(let item of this._Testing){
      item.status = "Testing";
      this.ticketServie.updateTicket(item).subscribe(data => {
        this.getUserTickets();
      });;
    }
    for(let item of this._InProcess){
      item.status = "InProcess";
      this.ticketServie.updateTicket(item).subscribe(data => {
        this.getUserTickets();
      });;
    }
    for(let item of this._Complete){
      item.status = "Completed";
      this.ticketServie.updateTicket(item).subscribe(data => {
        this.getUserTickets();
      });;
    }
    for(let item of this._Cancel){
      item.status = "Cancelled";
      this.ticketServie.updateTicket(item).subscribe(data => {
        this.getUserTickets();
      });;
    }
    this.getTicketsCount();
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.updateStatuses();
    }
  }

}
