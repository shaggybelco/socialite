import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthorizeService } from 'src/app/services/authorize.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private auth: AuthorizeService) { }

  form!: FormGroup;


  get f(){
    return this.form.controls;
  }

  createuser(){
    let users = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password,
      conpassword: this.form.value.conpassword
    }
    console.log(users);

    this.auth.createUser(users);
  }

  register(){
    this.createuser();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.minLength(3)]),
      email: new FormControl('', [Validators.email, Validators.minLength(10)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      conpassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
    
  }

}
