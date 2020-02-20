import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.dashBoard();
  }

  isLogged = false

  dashboard = false;
  nticket = false;
  inProTicket = false;
  compTicket = false;
  byMe = false;
  toMe = false;
  uProfile = false;
  status = false;


  newTicket(){
    this.nticket = true;
    this.dashboard = false;
    this.inProTicket = false;
    this.compTicket = false;
    this.byMe = false;
    this.toMe = false;
    this.uProfile = false;
    this.status = false;
  }

  dashBoard(){
    this.nticket = false;
    this.dashboard = true;
    this.inProTicket = false;
    this.compTicket = false;
    this.byMe = false;
    this.toMe = false;
    this.uProfile = false;
    this.status = false;
  }

  inProcTicket(){
    this.nticket = false;
    this.dashboard = false;
    this.inProTicket = true;
    this.compTicket = false;
    this.byMe = false;
    this.toMe = false;
    this.uProfile = false;
    this.status = false;
  }

  comTicket(){
    this.nticket = false;
    this.dashboard = false;
    this.inProTicket = false;
    this.compTicket = true;
    this.byMe = false;
    this.toMe = false;
    this.uProfile = false;
    this.status = false;
  }

  iByMe(){
    this.nticket = false;
    this.dashboard = false;
    this.inProTicket = false;
    this.compTicket = false;
    this.byMe = true;
    this.toMe = false;
    this.uProfile = false;
    this.status = false;
  }

  iToMe(){
    this.nticket = false;
    this.dashboard = false;
    this.inProTicket = false;
    this.compTicket = false;
    this.byMe = false;
    this.toMe = true;
    this.uProfile = false;
    this.status = false;
  }

  myProfile(){
    this.nticket = false;
    this.dashboard = false;
    this.inProTicket = false;
    this.compTicket = false;
    this.byMe = false;
    this.toMe = false;
    this.uProfile = true;
    this.status = false;
  }

  logout(){
    localStorage.clear(); 
    this.isLogged = false;
  } 
  
}
