import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ValidationService } from 'src/app/core/validation.service';
import { User, Info } from '../user.interface';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, ValidationService.emailValidator]],
      password: ['', Validators.required],
    });
  }

  login() {
    const user: Info<User> = this.userService.getUser();

    if (user) {
      if (this.userService.login(user, this.userForm)) {
        this.router.navigate(['/dashboard']);
      }
    } else {
      this.router.navigate(['/register']);
    }
  }
}
