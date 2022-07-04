import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthComponent{

  constructor(private http: HttpClient) { }

  baseurl:string = "http://localhost:5050";

  createUser(body: any){
    console.log("form data service : ", body);
    return this.http.post(`${this.baseurl}/user/register/`, body).subscribe((res) =>{
      console.log("data is " + res);
    });

  }

  loguser(body: any){
    console.log("form data service : ", body);
    return this.http.post(`${this.baseurl}/user/login/`, body);
  }
}
