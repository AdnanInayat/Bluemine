import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  title = 'Bluemine';
  isLogged = false;
  public ttype = "";
  constructor(private router: Router) {
    var token = localStorage.getItem('userToken');
    if (typeof token !== 'undefined' && token !== null) {
      this.isLogged = true;
    }
    else {
      this.isLogged = false;
    }

  }

  checkLogin() {
    if (localStorage.length === 2) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.clear();
    this.isLogged = false;
  }

  ticketType(tType) {
    this.router.navigate(['tickets/'+tType]);
    this.ttype = this.ttype;
  }

  // OnDestroy() {
  //   localStorage.removeItem('userToken');
  // }

}


