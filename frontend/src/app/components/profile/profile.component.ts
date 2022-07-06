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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  form: FormGroup = new FormGroup({
    userid: new FormControl(''),
    message: new FormControl(''),
  });

  msgto: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private profile: ProfileService
  ) {}

  name: any = {};
  messages: any = {};
  posting: any = {};

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
  }

  get f() {
    return this.form.controls;
  }

  post() {
    let postdata = {
      data: {
        userid: localStorage.getItem('user_id'),
        message: this.form.value.message,
      },
    };

    if(this.form.invalid){
      alert("can not post empty text");
      return;
    }else if(postdata.data.userid != '' && postdata.data.message != ''){
      console.log('it does nothing', postdata.data);
      this.profile.post(postdata.data).subscribe(
      (data: any) =>{
        alert('posted');
        window.location.reload();
       },
       (err)=>{
        alert("failed to post");
       });
      }
    }
  

  addImage() {
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = (_) => {
      let files = input.files;
      console.log(files);
    };
    input.click();
  }

 
}
