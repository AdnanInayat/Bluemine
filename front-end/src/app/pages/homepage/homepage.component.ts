import { Component, OnInit } from '@angular/core';
import { HomepageService } from '../../services/homepage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  model: any = {};
  isLoginError = false;
  isLogged: boolean;
  errors:any = {};
  errMsg:any = "";
  
  constructor(
    private homepageservice: HomepageService,
    private router: Router,
    private route: ActivatedRoute,
    private appComp: AppComponent, ) {
    // var token = localStorage.getItem('userToken');
    // if(typeof token !== 'undefined' && token !== null){
    //   this.isLogged = true;
    // }
    // else{
    //   this.isLogged = false;
    // }
  }

  ngOnInit() {
    // localStorage.clear();
    if (localStorage.length !== 0) {
      this.router.navigate(['/dashboard']);
    }

    // this.loginForm = new FormGroup({
    //   'email' : new FormControl
      

    // })

  }

  login() {
    // if(this.model.email==null){
    //   this.errors.email = true;
    //   this.errors.password = false;
    //   console.log('login email error');
    //   return
    // }
    // if(this.model.password==null){
    //   this.errors.password = true;
    //   this.errors.email = false;
    //   console.log('login password error');
    //   return
    // }
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
        if(err.status==422){
        this.errMsg='* Incorrect User Name or Password';
        // console.log(this.errMsg);
        }else {
          this.errMsg='* Incorrect User Name or Password'
          // console.log(this.errMsg);
        }
      }
    );
  }

}
