import { Injectable } from '@angular/core';
import { HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class MainService {    
    url :string;  
    token : string;
    header : any;  
    
    constructor() {
        
        this.url = 'http://localhost:5000/';
        const headerSettings: {[name: string]: string | string[]; } = {};  
        this.header = new HttpHeaders(headerSettings); 
    }
}
