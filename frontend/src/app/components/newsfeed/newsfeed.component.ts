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
    console.log(localStorage.getItem('user_id'));
    this.profile
      .viewPost(localStorage.getItem('user_id'))
      .subscribe((prof: any) => {
        this.posting = prof;
        const j = prof.length;
        console.log(this.posting);

        for (let i = 0; i < prof.length; i++) {
          console.log(
            (this.name = prof[i].name),
            (this.messages = prof[i].message)
          );
        }
      });

      this.profile
      .getPic(localStorage.getItem('user_id'))
      .subscribe((imgstat: any) => {
        this.imgpost = imgstat;
        const j = imgstat.length;
        console.log(imgstat);

        for (let i = 0; i < imgstat.length; i++) {
          console.log(
            (this.name = imgstat[i].name),
            (this.messages =imgstat[i].caption),
            (this.imgurl = imgstat[i].image),
            (this.imgdate = imgstat[i].date)
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
    // let postdata = {
    //   data: {
    //     userid: localStorage.getItem('user_id'),
    //     message: this.form.value.message,
    //   },
    // };

    // if(this.form.invalid){
    //   alert("can not post empty text");
    //   return;
    // }else if(postdata.data.userid != '' && postdata.data.message != ''){
    //   console.log('it does nothing', postdata.data);
    //   this.profile.post(postdata.data).subscribe(
    //   (data: any) =>{
    //     alert('posted');
    //     window.location.reload();
    //    },
    //    (err)=>{
    //     alert("failed to post");
    //    });
    //   }

        const formdata = new FormData();
   
        this.form.get('userid')?.setValue(localStorage.getItem('user_id'));
        
        this.form.value.date = this.todayDate;
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

    }
  
    todayDate : Date = new Date();

    files: any = {};
    addImage() {
    
      
      let input = document.createElement('input');
      const formdata = new FormData();
      input.type = 'file';
      input.onchange = (_) => {
        this.files = input.files?.item(0);
        this.form.get('userid')?.setValue(localStorage.getItem('user_id'));
        
        this.form.value.date = this.todayDate;
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
