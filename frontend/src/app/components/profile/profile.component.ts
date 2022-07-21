import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import {
  FormControl,
  FormGroup,
} from '@angular/forms';
import { UploadService } from 'src/app/services/upload.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private profile: ProfileService,
    private uploadingPic: UploadService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  form: FormGroup = new FormGroup({
    userid: new FormControl(''),
    message: new FormControl(''),
  });

  uploadform!: FormGroup;

  msgto: string = '';

  name: any = {};
  userID: any = {};
  email:any ={};
  messages: any = {};
  posting: any = {};
  imgurl: any = {};
  imgpost: any = {};

  ngOnInit(): void {
    console.log(localStorage.getItem('user_id'));

    this.userID = localStorage.getItem('user_id')
    this.profile
      .getAll(localStorage.getItem('user_id'))
      .subscribe((prof: any) => {
        this.name = prof[0].name;
        this.email= prof[0].email;
        console.log(this.name);
        console.log(this.userID);
      });

    this.profile
      .viewPost(localStorage.getItem('user_id'))
      .subscribe((prof: any) => {
        this.posting = prof;
        console.log(this.posting);

        for (let i = 0; i < prof.length; i++) {
          console.log(
            (this.name = prof[i].name),
            (this.messages = prof[i].message)
            (this.email = prof[i].email)
          );
        }
      });

    this.profile
      .getPic(localStorage.getItem('user_id'))
      .subscribe((imgstat: any) => {
        this.imgpost = imgstat;

        console.log(imgstat);

        for (let i = 0; i < imgstat.length; i++) {
          console.log(
            (this.name = imgstat[i].name),
            (this.messages = imgstat[i].caption),
            (this.imgurl = imgstat[i].image)
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

    if (this.form.invalid) {
      alert('can not post empty text');
      return;
    } else if (postdata.data.userid != '' && postdata.data.message != '') {
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
            this.router.routeReuseStrategy.shouldReuseRoute = ()=> false;
            this.router.onSameUrlNavigation = "reload";
            this.router.navigate(['/profile'], {relativeTo: this.route})
          },
          (err) => {
            alert(`failed to post: ${err.message}`);
          }
        );
    }
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
      formdata.append('caption', this.form.value.message);
      formdata.append('myfile', this.files);

      console.log('it does nothing', formdata);

      this.uploadingPic.uploading(formdata).subscribe(
        (data: any) => {
          alert('posted');
          console.log(data);
          this.router.routeReuseStrategy.shouldReuseRoute = ()=> false;
          this.router.onSameUrlNavigation = "reload";
          this.router.navigate(['/profile'], {relativeTo: this.route})
        },
        (err) => {
          alert(`failed to post: ${err.message}`);
        }
      );

      console.log(this.files);
    };

    input.click();
  }
}
