import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorizeService } from 'src/app/services/authorize.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  constructor(private auth: AuthorizeService, private route: Router) { }

  get f(){
    return this.form.controls;
  }

  log(){
    let userlogin = {
      data: {
        email: this.form.value.email,
        password: this.form.value.password
      }
    };
    
    if(this.form.untouched){
      return;
    }else{
      this.auth.loguser(userlogin.data).subscribe({
        next: data =>{
          this.route.navigate(['/newsfeed']);
          alert("Logged in successfully");
        },
        error: err =>{
          
        }
      });
    }


    
  }


  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.minLength(10)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });

  }

}
