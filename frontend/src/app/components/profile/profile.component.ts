import { Component, Input, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import {
  FormControl,
  FormGroup,
} from '@angular/forms';
import { UploadService } from 'src/app/services/upload.service';
import { ActivatedRoute,Router } from '@angular/router';
import { SortUsersService } from 'src/app/services/sort-users.service';
import { SuggestedUsersService } from 'src/app/services/suggested-users.service';
import { Spinkit } from 'ng-http-loader';
import { empty } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() message = '';
  
  spinnerStyle = Spinkit;

  constructor(
    private userservice: SuggestedUsersService,
    private profile: ProfileService,
    private uploadingPic: UploadService,
    private userSort: SortUsersService,
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
  imgid: any = [];
  users: any = [];
  pushAllUsers: any = [];
  follo: any = [];
  sortUserPush: any = [];
  followe: any = [];
  suggestedNameID: any = [];
  numberOfFollowing: number = 0;
  numberOfFollowers: number = 0;
  showpost: boolean = false;
  profileImg: any;
  img: boolean = false;

  ngOnInit(): void {
    this.profile.getID().subscribe((decoded: any)=>{
      this.userID = decoded.decoded.id
      
      this.afterId();
    })
  }

 afterId(){
 
    this.profile.getProfileImage(this.userID).subscribe(
      (img: any)=>{
        console.log(img[0].image);
        if(img[0].image == ''){
          this.img = false;
        }else{
          this.img = true;
          this.profileImg = img[0].image;
        }
        
      }
    )
 
    this.profile
      .getAll(this.userID)
      .subscribe((prof: any) => {
        this.name = prof[0].name;
        this.email= prof[0].email;
      });

    this.profile
      .getPic(this.userID)
      .subscribe((imgstat: any) => {
        this.imgpost = imgstat;
      
        
        if(imgstat != []){
          this.showpost = true;
        }
      });

      this.getFollow();
      this.getUsers();
      this.getFollowers();
  }

  deletePost(postNum: any){
    const ids = {
      postid: this.imgpost[postNum].id,
      id: this.userID
    }
    this.profile.deletePost(ids.postid, ids.id).subscribe(
      (deleted)=>{
        this.router.routeReuseStrategy.shouldReuseRoute = ()=> false;
        this.router.onSameUrlNavigation = "reload";
        this.router.navigate(['/profile'], {relativeTo: this.route})
      },(err)=>{
        alert(`Failed to deleted this ${err.message}`)
      }
    )
  }
  async getUsers(){
    this.userSort.getall(this.userID).subscribe(
      {
        next: (user: any) =>{
          this.pushAllUsers = user;
        },
        error: (err: any) =>{
          alert(err.message);
        }
      }
    )
    await this.pushAllUsers;
  }

  
  getFollow() {
    this.profile.getFollowing(this.userID).subscribe(
      {
        next: (data: any)=>{
          this.numberOfFollowing = data.length;
        }
      }
    )
  }

  getFollowers(){
    this.profile.getFollowers(this.userID).subscribe(
      {
        next: (data: any) =>{
          this.numberOfFollowers = data[0].count;
        }
      }
    )
  }

  get f() {
    return this.form.controls;
  }

  post() {
    let postdata = {
      data: {
        userid: this.userID,
        message: this.form.value.message,
      },
    };

    if (this.form.invalid) {
      alert('can not post empty text');
      return;
    } else if (postdata.data.userid != '' && postdata.data.message != '') {
        console.log(this.formdata)
        
  
       
        console.log('it does nothing', this.formdata);
  
        this.uploadingPic.uploading(this.formdata).subscribe(
          (data: any) => {
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
  formdata = new FormData();
  added: boolean = false;
  addBefore(){
    let input = document.createElement('input');
    // const formdata = new FormData();
    console.log(this.formdata)
    input.type = 'file';
    input.onchange = (_) => {
      this.files = input.files?.item(0);
      if(input.files?.item(0) != null)
      {
        this.added = true;
      }
      this.form.get('userid')?.setValue(this.userID);

      this.formdata.append('userid', this.form.value.userid);
      this.formdata.append('caption', this.form.value.message);
      this.formdata.append('myfile', this.files);
    }
    
    input.click();
  }
  addImage() {
    


      this.uploadingPic.uploading(this.formdata).subscribe(
        (data: any) => {
          this.router.routeReuseStrategy.shouldReuseRoute = ()=> false;
          this.router.onSameUrlNavigation = "reload";
          this.router.navigate(['/profile'], {relativeTo: this.route})
        },
        (err) => {
          alert(`failed to post: ${err.message}`);
        }
      );
    }

  

 

  addProfileImage() {
    let input = document.createElement('input');
    const formdata = new FormData();
    input.type = 'file';
    input.onchange = (_) => {
      this.files = input.files?.item(0);
      this.form.get('userid')?.setValue(this.userID);

      formdata.append('userid', this.form.value.userid);
      formdata.append('myfile', this.files);


      this.uploadingPic.uploadingProfile(formdata).subscribe(
        (data: any) => {
          this.router.routeReuseStrategy.shouldReuseRoute = ()=> false;
          this.router.onSameUrlNavigation = "reload";
          this.router.navigate(['/profile'], {relativeTo: this.route})
        },
        (err) => {
          alert(`failed to post: ${err.message}`);
        }
      );
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
