import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SortUsersService {
  constructor(private http: HttpClient) {}

  baseurl: string = 'https://socialitesapp.herokuapp.com';
  getall(id: any) {
    return this.http.get(`${this.baseurl}/user/get/${id}`);
  }

  getFriends(id: any) {
    return this.http.get(`${this.baseurl}/user/getall/${id}`);
  }
}
