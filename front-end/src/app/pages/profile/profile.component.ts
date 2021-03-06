import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterUserService } from 'src/app/services/register-user.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Router} from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  model: any = {};
  profileForm: FormGroup;

  public userData: any[];

  constructor(private userService: ProfileService, private formBuilder: FormBuilder, private router: Router, ) { }

  ngOnInit() {
    this.getUserProfile();
  }


  getUserProfile() {
    this.userService.userProfile().subscribe((data) => {
      console.log("user data from db", data);

      // this.userData = data;
      // var udata = Object.values(data);
      this.model = data;

      console.log("model data new", this.model);
      // const newModel = JSON.stringify(this.model);
      // console.log(newModel); 

      // this.profileForm = this.formBuilder.group({
      //   name : ["", [Validators.required]],
      //   email : ["", [Validators.required]],
      //   phone : ["", [Validators.required]],
      //   address : ["" , [Validators.required]],
      //   city : ["", [Validators.required]],
      //   country : ["", [Validators.required]]      
      // });


    });
  }


  updUserUProfile() {
    // console.log(this.model);
    // var id = localStorage.getItem(userId);
    console.log(this.model);
    this.userService.updateProfile(this.model).subscribe((data) => {
      console.log(this.model);
      alert("Profile has been updated....");
      this.router.navigate(['/dashboard'])

    });
  }

}
