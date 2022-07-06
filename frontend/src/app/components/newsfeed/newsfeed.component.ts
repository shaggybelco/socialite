import { Component, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { ProfileService } from 'src/app/services/profile.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss']
})
export class NewsfeedComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private profile: ProfileService
  ) {}

  ngOnInit(): void {

    console.log("this is from NewsfeedComponent" , localStorage.getItem("user_id"))
  }

  form: FormGroup = new FormGroup({
    userid: new FormControl(''),
    message: new FormControl(''),
  });

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
