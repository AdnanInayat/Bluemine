import { Component, OnInit } from '@angular/core';
import { NewticketService } from 'src/app/services/newticket.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-newticket',
  templateUrl: './newticket.component.html',
  styleUrls: ['./newticket.component.css']
})
export class NewticketComponent implements OnInit {

  model: any = {};

  test: string = "helloo";

  constructor(private newticketService: NewticketService, private router: Router) {
    this.test += " world";
   }

  ngOnInit() {
  }

  postNewTicket(){
    this.newticketService.newTicket(this.model).subscribe((data: any) => {
      console.log(data);      
      // console.log('token from local storage', localStorage.userToken);
      this.router.navigate(['/dashboard']);
    }
    );
  }
  

}
