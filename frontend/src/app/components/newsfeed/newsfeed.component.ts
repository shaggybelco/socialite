import { Component, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { ProfileService } from 'src/app/services/profile.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UploadService } from 'src/app/services/upload.service';

export interface DialogData{
  post: string;
}
@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss']
})
export class NewsfeedComponent implements OnInit {

  
  constructor(
    private formBuilder: FormBuilder,
    private profile: ProfileService,
    private uploadingPic: UploadService
  ) {}

  name: any = {};
  messages: any = {};
  posting: any = {};
  imgurl: any = {};
  imgpost: any={};
  imgdate: any={};


  ngOnInit(): void {


      this.profile
      .getPic(localStorage.getItem('user_id'))
      .subscribe((imgstat: any) => {
        this.imgpost = imgstat;
        const j = imgstat.length;
        console.log(imgstat);

        for (let i = 0; i < imgstat.length; i++) {
          console.log( "pic posting ",
            (this.name = imgstat[i].name),
            (this.messages =imgstat[i].caption),
            (this.imgurl = imgstat[i].image)
          );
        }
      });

  }

  
  form: FormGroup = new FormGroup({
    userid: new FormControl(''),
    message: new FormControl(''),
    date: new FormControl('')
  });

  post() {
        const formdata = new FormData();
   
        this.form.get('userid')?.setValue(localStorage.getItem('user_id'));
        
        formdata.append('userid', this.form.value.userid);
        formdata.append('caption', this.form.value.message)
        formdata.append('myfile',this.files);
  
       
        console.log('it does nothing', formdata);
  
        this.uploadingPic.uploading(formdata).subscribe(
          (data: any) => {
            alert('posted');
            console.log(data);
            window.location.reload();
          },
          (err) => {
            alert('failed to post');
          }
        );

    }
  
    
    
    files: any = {};
    addImage() {
    
      
      let input = document.createElement('input');
      const formdata = new FormData();
      input.type = 'file';
      input.onchange = (_) => {
        this.files = input.files?.item(0);
        this.form.get('userid')?.setValue(localStorage.getItem('user_id'));
        
        formdata.append('userid', this.form.value.userid);
        formdata.append('caption', this.form.value.message)
        formdata.append('myfile',this.files);
        formdata.append('date',this.form.value.date);
  
       
        console.log('it does nothing', formdata);
  
        this.uploadingPic.uploading(formdata).subscribe(
          (data: any) => {
            alert('posted');
            console.log(data);
            window.location.reload();
          },
          (err) => {
            alert('failed to post');
          }
        );
  
        console.log(this.files);
      };
  
      input.click();
   
    }
}
