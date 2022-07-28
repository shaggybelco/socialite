import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `${sessionStorage.getItem('token')}`,
  }),
  responseType: 'json' as 'json',
  withCredentials: false,
};

@Injectable({
  providedIn: 'root',
})
export class AuthorizeService {
  constructor(private http: HttpClient) {}

  baseurl: string = 'https://socialitesapp.herokuapp.com';

  createUser(body: any) {
    return this.http.post(`${this.baseurl}/user/register/`, body, httpOptions);
  }

  token = localStorage.getItem('token');

  loguser(body: any): Observable<any> {
    return this.http.post(`${this.baseurl}/user/login/`, body, httpOptions);
  }

  logout(){
    return this.http.post(this.baseurl + '/signout', {}, httpOptions);
  }

  //Gaurds
  isLoggedIn = false;

  isAuthenticated() {
    return localStorage.getItem('token') != null;
  }
}
