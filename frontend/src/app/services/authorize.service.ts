import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {

  constructor(private http: HttpClient) { }

  baseurl:string = "http://localhost:5050";

  createUser(body: any){
    console.log("form data service : ", body);
    return this.http.post(`${this.baseurl}/user/register/`, body);

  }

  loguser(body: any){
    console.log("form data service : ", body);
    return this.http.post(`${this.baseurl}/user/login/`, body);
  }
}
