import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  title = 'Bluemine';
  isLogged = false;
  constructor(){
    var token = localStorage.getItem('userToken');
    if(typeof token !== 'undefined' && token !== null){
      this.isLogged = true;      
    }
    else{
      this.isLogged = false;      
    }        
    
  }

  logout(){
    localStorage.clear(); 
    this.isLogged = false;
  } 
  
  
}


