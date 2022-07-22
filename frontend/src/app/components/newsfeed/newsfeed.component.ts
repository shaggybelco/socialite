import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { UploadService } from 'src/app/services/upload.service';
import { ActivatedRoute,Router } from '@angular/router';

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
    private uploadingPic: UploadService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  name: any = {};
  messages: any = {};
  posting: any = {};
  imgurl: any = {};
  imgpost: any={};
  imgdate: any={};


  ngOnInit(): void {

      const id = localStorage.getItem('user_id');
      this.profile
      .viewPost(id)
      .subscribe((imgstat: any) => {
        this.imgpost = imgstat;
        const j = imgstat.length;
       
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
  
       
  
        this.uploadingPic.uploading(formdata).subscribe(
          (data: any) => {
            console.log(data);
            this.router.routeReuseStrategy.shouldReuseRoute = ()=> false;
            this.router.onSameUrlNavigation = "reload";
            this.router.navigate(['/newsfeed'], {relativeTo: this.route})
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
  
  
        this.uploadingPic.uploading(formdata).subscribe(
          (data: any) => {
            console.log(data);
            this.router.routeReuseStrategy.shouldReuseRoute = ()=> false;
            this.router.onSameUrlNavigation = "reload";
            this.router.navigate(['/newsfeed'], {relativeTo: this.route})
          },
          (err) => {
            alert('failed to post');
          }
        );
  
        console.log(this.files);
      };
  
      input.click();
   
    }

    transform(date: any) {
      if (!date) { return 'a long time ago'; }
      let time = (Date.now() - Date.parse(date)) / 1000;
      if (time < 10) {
        return 'just now';
      } else if (time < 60) {
        return 'a second ago';
      }
      const divider = [60, 60, 24, 30, 12];
      const string = [' second', ' minute', ' hour', ' day', ' month', ' year'];
      let i;
      for (i = 0; Math.floor(time / divider[i]) > 0; i++) {
        time /= divider[i];
      }
      const plural = Math.floor(time) > 1 ? 's' : '';
      return Math.floor(time) + string[i] + plural + ' ago';
    }
}
