import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseurl:string = "http://localhost:5050/news";

  constructor(private view: HttpClient) { }

  viewPost(id: any){
    return this.view.get(`${this.baseurl}/getone/${id}`);
  }

  post(body: any){
    return this.view.post(`${this.baseurl}/poststatus`, body);
  }
}
