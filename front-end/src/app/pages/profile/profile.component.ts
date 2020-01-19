import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterUserService } from 'src/app/services/register-user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  model: any = {};
  profileForm: FormGroup;

  public userData: any[];

  constructor(private userService: RegisterUserService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getUserProfile();

    this.profileForm = this.formBuilder.group({
      name : ["", [Validators.required]],
      email : ["", [Validators.required]],
      phone : ["", [Validators.required]],
      address : ["" , [Validators.required]],
      city : ["", [Validators.required]],
      country : ["", [Validators.required]]      
    })
    
  }


  getUserProfile(){
    this.userService.userProfile().subscribe((data)=>{
      console.log(data);
      
      this.userData = data;
     
    });

    
  }

}
