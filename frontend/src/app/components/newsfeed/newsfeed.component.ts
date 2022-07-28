import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UploadService } from 'src/app/services/upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Spinkit } from 'ng-http-loader';
import { SuggestedUsersService } from 'src/app/services/suggested-users.service';

export interface DialogData {
  post: string;
}
@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss'],
})
export class NewsfeedComponent implements OnInit {
  spinnerStyle = Spinkit;
  constructor(
    private formBuilder: FormBuilder,
    private profile: ProfileService,
    private uploadingPic: UploadService,
    private router: Router,
    private route: ActivatedRoute,
    private userservice: SuggestedUsersService
  ) {}

  name: any = {};
  messages: any = {};
  posting: any = {};
  imgurl: any = {};
  imgpost: any = {};
  imgdate: any = {};
  userId: any;

  ngOnInit(): void {
    // const id = localStorage.getItem('user_id');
    this.profile.getID().subscribe((decoded: any) => {
      this.userId = decoded.decoded.id;
      // console.log(decoded.decoded.id);
      this.profile.viewPosts().subscribe((imgstat: any) => {
        this.imgpost = imgstat;
      });
    });
  }
  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }


  seeProfile(userId: any) {
    this.userservice
      .getOne(this.imgpost[userId].followid)
      .subscribe((followed: any) => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/viewprofile'], { relativeTo: this.route });
        localStorage.setItem('count', this.imgpost[userId].followid);

        //sending status
        sessionStorage.setItem('status', 'true');
        sessionStorage.setItem('option', 'unfollow');
      });
  }

  form: FormGroup = new FormGroup({
    userid: new FormControl(''),
    message: new FormControl(''),
    date: new FormControl(''),
  });

  post() {
    let postdata = {
      data: {
        userid: this.userId,
        message: this.form.value.message,
      },
    };

    if (this.form.invalid) {
      alert('can not post empty text');
      return;
    } else if (postdata.data.userid != '') {
        this.uploadingPic.uploading(this.formdata).subscribe(
          (data: any) => {
            this.router.routeReuseStrategy.shouldReuseRoute = ()=> false;
            this.router.onSameUrlNavigation = "reload";
            this.router.navigate(['/newsfeed'], {relativeTo: this.route})
          },
          (err) => {
            alert(`failed to post: ${err.message}`);
          }
        );
    }
  }


  // formdata = new FormData();
  files: any = {};
  formdata = new FormData();
  added: boolean = false;

  addBefore() {
    let input = document.createElement('input');
    // const formdata = new FormData();
    // console.log(this.formdata);
    input.type = 'file';
    input.onchange = (_) => {
      this.files = input.files?.item(0);
      if (input.files?.item(0) != null) {
        this.added = true;
      }
      this.form.get('userid')?.setValue(this.userId);

      this.formdata.append('userid', this.form.value.userid);
      this.formdata.append('caption', this.form.value.message);
      this.formdata.append('myfile', this.files);
    };

    input.click();
  }

  addImage() {
    this.uploadingPic.uploading(this.formdata).subscribe(
      (data: any) => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/profile'], { relativeTo: this.route });
      },
      (err) => {
        alert(`failed to post: ${err.message}`);
      }
    );
  }

  transform(date: any) {
    if (!date) {
      return 'a long time ago';
    }
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
