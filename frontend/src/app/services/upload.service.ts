import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  baseurl:string = "http://localhost:5050/user";

  constructor(private upload: HttpClient) { }

  uploading(body: any){
    return this.upload.post(`${this.baseurl}/upload`,body);
  }
}
