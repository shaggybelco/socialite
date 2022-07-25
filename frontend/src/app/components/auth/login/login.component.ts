import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorizeService } from 'src/app/services/authorize.service';
import { Router } from '@angular/router';
import { Spinkit } from 'ng-http-loader';
import { StorageServiceService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  spinnerStyle = Spinkit;
  form!: FormGroup;
  user: any;
  id: any;
  isLoggedIn = false;

  constructor(private auth: AuthorizeService, private route: Router, private storageService: StorageServiceService) {}
  ngOnInit(): void {
    localStorage.clear();
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.minLength(10), Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });

    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      // this.roles = this.storageService.getUser().roles;
    }
  }

  get f() {
    return this.form.controls;
  }

  hide = false;

  reloadPage(): void {
    window.location.reload();
  }

  log() {
    let userlogin = {
      data: {
        email: this.form.value.email,
        password: this.form.value.password,
      },
    };

    if (this.form.invalid) {
      return;
    } else {
      this.hide = true;
      this.auth.loguser(userlogin.data).subscribe(
        (myData: any) => {
          console.log(myData)
          this.user = myData.user[0].id;
          this.route.navigate(['/newsfeed']);
    
          this.storageService.saveUser(myData.token);
          this.isLoggedIn = true;

          // this.reloadPage();
          this.storageService.getUser();
         this.auth.isLoggedIn = true;
          // alert("Login successfully");
          localStorage.setItem('user_id', this.user);
          
          localStorage.setItem('token', myData.token)
          sessionStorage.setItem('token', myData.token)
          this.id = this.user;

        },
        error => {
          alert("You are not registered or email or password is wrong");
        }
      );
    }
  }
}
