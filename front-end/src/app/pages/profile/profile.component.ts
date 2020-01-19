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

      // var uData = Object.values(data);

    //   this.profileForm = this.formBuilder.group({
    //     name : [uData[0].name, [Validators.required]],
    //     email : [uData[0].email, [Validators.required]],
    //     phone : [uData[0].phone, [Validators.required]],
    //     address : [uData[0].address , [Validators.required]],
    //     city : [uData[0].city, [Validators.required]],
    //     country : [uData[0].country, [Validators.required]]      
    //   })

    });

    
  }

}
