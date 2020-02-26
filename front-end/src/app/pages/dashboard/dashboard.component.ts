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

  title = 'App';
  // public pieChartLabels: string[] = ['Pending', 'InProgress', 'OnHold', 'Completed', 'Cancelled'];
  public pieChartLabels: string[] = ['New', 'InProgress', 'Testing', 'Completed', 'Cancelled'];
  public pieChartData: number[] = [21, 39, 10, 14, 16];
  public pieChartType: string = 'pie';
  public pieChartOptions = [{ backgroundColor: ['#17A2B8', '#FFC107', '#6C757D', '#28A745', '#DC3545'] }];

  private _New: Array<any>;
  private _InProcess: Array<any>;
  private _Testing: Array<any>;
  private _Complete: Array<any>;
  private _Cancel: Array<any>;

  constructor(private ticketServie: TicketService,
    private route: ActivatedRoute, private router: Router) {
    router.events.subscribe((val: any) => {
      if (typeof (val.url) !== 'undefined' && val.url.indexOf("dashboard") > 0) {
        var url = val.url.split('/')[2];
        this.type = url;
      }
    });
    this.getUserTickets();
  }
  private type: string = "";
  ngOnInit() {
    
  }
  setType(type) {
    this.type = type;
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
