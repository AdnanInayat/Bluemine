import { Component, OnInit, Input } from '@angular/core';
import { RegisterUserService } from '../../services/register-user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: any = {};
  isLoginError: boolean = false;

  constructor(private registerUserService: RegisterUserService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.registerUserService.register(this.user).subscribe((data: any) => {
      console.log(data);
      localStorage.setItem('userToken', data.token);
      // console.log('token from local storage', localStorage.userToken);
      this.router.navigate(['/home']);
    },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
      }
    );
  }

}