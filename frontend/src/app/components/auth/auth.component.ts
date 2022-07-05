import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizeService } from 'src/app/services/authorize.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(private auth: AuthorizeService, private route: Router, private formbuilder: FormBuilder) {}

  form: FormGroup = new FormGroup({
        name: new FormControl(''),
        email: new FormControl(''),
        password: new FormControl(''),
        conpassword: new FormControl(''),
  });

  get f() {
    return this.form.controls;
  }

  createuser(): void {
    let users = {
      data: {
        name: this.form.value.name,
        email: this.form.value.email,
        password: this.form.value.password,
        conpassword: this.form.value.conpassword,
      },
    };

    if (users.data.password != users.data.conpassword) {
     alert("Password don't match")
    } else if(this.form.invalid){
      return;
    }else {
      this.auth.createUser(users.data).subscribe({
        next: data =>{
          this.route.navigate(['/newsfeed']);
          alert("Registered in successfully");
        },
        error: err =>{
          alert("You are already registered");
        }
  
      });
    }
  }

  register() {
    this.createuser();
  }

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      name: ['',[Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.email, Validators.minLength(10), Validators.required]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
      ]],
      conpassword: ['', [
        Validators.required,
        Validators.minLength(8),
      ]]
    },{
     
    });
  }
}
