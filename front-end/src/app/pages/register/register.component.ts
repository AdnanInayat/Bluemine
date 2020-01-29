import { Component, OnInit, Input } from '@angular/core';
import { RegisterUserService } from '../../services/register-user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { User } from 'src/app/model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // datee = formatDate(new Date(), 'yyyy/MM/dd', '');
  // user: any = { deleted: 0, active: 1, isAdmin: 0, created_at: this.datee, updated_at: this.datee};
  user: any = {};
  isLoginError: boolean = false;

  constructor(private registerUserService: RegisterUserService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.registerUserService.register(this.user).subscribe((data: any) => {
      console.log(data);
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('userId', data.userId);
      // console.log('token from local storage', localStorage.userToken);
      this.router.navigate(['/home']);
    },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
      }
    );
  }

}
