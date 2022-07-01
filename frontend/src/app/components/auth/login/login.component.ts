import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthorizeService } from 'src/app/services/authorize.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  constructor(private auth: AuthorizeService) { }

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
    console.log(userlogin);

    this.auth.loguser(userlogin.data);
  }


  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.minLength(10)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });

  }

}
