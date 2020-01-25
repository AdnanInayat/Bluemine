import { Injectable } from '@angular/core';
import { AuthmainService } from './authmain.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends AuthmainService {

  constructor(private http: HttpClient) {
    super();
   }



  userProfile(){
    
    // this.token = localStorage.getItem("userToken");
    // this.header = this.header.append("Authorization", "Bearer " + this.token);
    return this.http.get<any>(this.url+'users/me',{ headers: this.header});
  }

  updateProfile(data){

    // this.token = localStorage.getItem("userToken");
    const id = localStorage.getItem("userId");
    return this.http.put<any>(this.url+'users/'+id, data, { headers: this.header});
  }

}
