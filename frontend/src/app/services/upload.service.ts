import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  baseurl: string = 'https://socialitesapp.herokuapp.com';
  
  constructor(private upload: HttpClient) { }

  uploading(body: any){
    return this.upload.post(`${this.baseurl}/user/upload`,body);
  }

  uploadingProfile(body: any){
    return this.upload.put(`${this.baseurl}/user/profile`,body);
  }
}
