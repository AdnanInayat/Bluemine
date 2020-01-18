import { Component, OnInit } from '@angular/core';
import { HomepageService } from '../../services/homepage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  model: any = {};
  isLoginError: boolean = false;

  constructor(private homepageservice: HomepageService, private router: Router, private route: ActivatedRoute) {
   }

  ngOnInit() {
    // localStorage.clear(); 
  }

  login() {
    this.homepageservice.Login(this.model).subscribe((data: any) => {
      // console.log(data);
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('userId', data.userId);
      
      console.log(localStorage);      
      // console.log("user token: ", localStorage.userToken);
      // console.log("user ID: ", localStorage.userID);

           
      // console.log('token from local storage', localStorage.userToken);
      this.router.navigate(['/dashboard']);
      // this.router.navigateByUrl('/dashboard');
      
    },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
      }
    );
  }

}
