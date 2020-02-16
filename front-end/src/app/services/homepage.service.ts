import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class HomepageService extends MainService {

  constructor(private http: HttpClient) {
    super();
    this.url += 'users/login';
    const headerSettings: { [name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
  }

  Login(model: any) {
    return this.http.post<any>(this.url, model, { headers: this.header });
  }
}
