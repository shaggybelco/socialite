import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SuggestedUsersService {

  baseurl:string = "http://localhost:5051";

  constructor(private http:HttpClient) { }

  getSuggestedUsers()
  {
     return this.http.get('http://localhost:5051/user/suggestedUsers');
  }


  followUsers(body :any)
  {
      return this.http.post('http://localhost:5051/user/toFollow',body)
  }
}
