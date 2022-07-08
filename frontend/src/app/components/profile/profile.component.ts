import { NgForOf, NgForOfContext } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCard } from '@angular/material/card';
import { ProfileService } from 'src/app/services/profile.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private profile: ProfileService,
    private uploadingPic: UploadService
  ) {}
  
  form: FormGroup = new FormGroup({
    userid: new FormControl(''),
    message: new FormControl(''),
  });

  uploadform!: FormGroup;

  msgto: string = '';

  

  name: any = {};
  messages: any = {};
  posting: any = {};
  imgurl: any = {};
  imgpost: any={};

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
        console.log(this.posting);

        for (let i = 0; i < imgstat.length; i++) {
          console.log(
            (this.name = imgstat[i].name),
            (this.messages =imgstat[i].caption),
            (this.imgurl = imgstat[i].image)
          );
        }
      });
  }

  get f() {
    return this.form.controls;
  }

  post() {
    
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
