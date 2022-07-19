import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {

  constructor(private http: HttpClient) { }

  baseurl:string = "http://localhost:5050";

  createUser(body: any){
    return this.http.post(`${this.baseurl}/user/register/`, body);

  }

  loguser(body: any):Observable<any>{
    return this.http.post(`${this.baseurl}/user/login/`, body);
  }

  sendMail(body: any){
    return this.http.post(`${this.baseurl}/user/login/`, body)
  }
}
