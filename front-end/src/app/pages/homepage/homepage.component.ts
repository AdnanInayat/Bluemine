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
  }

  login() {
    this.homepageservice.Login(this.model).subscribe((data: any) => {
      // console.log(data);
      localStorage.setItem('userToken', data.token);
      console.log("user token ", localStorage.userToken);
           
      // console.log('token from local storage', localStorage.userToken);
      this.router.navigate(['/dashboard']);
    },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
      }
    );
  }

}
