import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/core/validation.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', [Validators.required, ValidationService.emailValidator]],
      password: ['', [Validators.required, Validators.minLength(10)]],
      confirm: ['', [Validators.required, ValidationService.matchValues('password')]]
    });
  }

  saveUser() {
    if (this.userForm.dirty && this.userForm.valid) {
      const isRegistered = this.userService.register(this.userForm);
      if (isRegistered) {
        this.router.navigate(['/login']);
      }
  }
}

}
