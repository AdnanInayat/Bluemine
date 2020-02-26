import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { RegisterUserService } from 'src/app/services/register-user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-newticket',
  templateUrl: './newticket.component.html',
  styleUrls: ['./newticket.component.css']
})
export class NewticketComponent implements OnInit {

  model: any = {status: "New"};
  newTicketForm: FormGroup;
  public results: any[];

  test: string = "helloo";

  constructor(private newticketService: TicketService, private getUserService: RegisterUserService, private router: Router, private formBuilder: FormBuilder) {
    this.test += " world";
   }

  ngOnInit() {
    this.usersForTicket();

    this.newTicketForm = this.formBuilder.group({
      name : ["" , [Validators.required]]
    })
  }

  postNewTicket(){
    this.newticketService.newTicket(this.model).subscribe((data: any) => {
      console.log(data);      
      // console.log('token from local storage', localStorage.userToken);
      this.router.navigate(['/dashboard']);
    }
    );
  }
  
  usersForTicket(){
    this.getUserService.getUsers().subscribe((data)=>{
      console.log(data);
      this.results = data;
      console.log("results", this.results)
    });

  }

}
