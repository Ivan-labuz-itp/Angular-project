import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { UserSharedService } from '../services/userShared.service'
import { User } from '../app.model'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {

  interfaceLogin: FormGroup = new FormGroup({
    "userLogEmail": new FormControl("", [
      Validators.required,
      Validators.email
    ]),
    "userLogPassword": new FormControl("", [
      Validators.required,
      Validators.minLength(6)
    ])
  })

  interfaceRegistration: FormGroup = new FormGroup({
    "userRegEmail": new FormControl("", [
      Validators.required,
      Validators.email
    ]),
    "userRegPassword": new FormControl("", [
      Validators.required,
      Validators.minLength(6)
    ]),
    "repeatRegPassword": new FormControl("", [
      Validators.required,
      Validators.minLength(6)
    ])
  })

  interfaceRecovery: FormGroup = new FormGroup({
    "userRecovEmail": new FormControl("", [
      Validators.required,
      Validators.email])
  })


  registration: boolean = false;
  passwordRecovery: boolean = false;
  users: Array<User> = [];
  recoveryPass: string = '';
  currentUser: User = {
    _id: '',
    email: '',
    password: '',
    basket: []
  };

  constructor(
    private userSharedService: UserSharedService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userSharedService.usersShared$.subscribe(arr => this.users = arr)
  }

  registrationSwitch(): void {
    this.registration = !this.registration
    this.interfaceRegistration.reset()
    this.interfaceLogin.reset()
    this.currentUser = {
      _id: '',
      email: '',
      password: '',
      basket: [],
    };
  }

  recoverySwitch(): void {
    this.passwordRecovery = !this.passwordRecovery
    this.interfaceRecovery.reset()
    this.interfaceLogin.reset()
    this.currentUser = {
      _id: '',
      email: '',
      password: '',
      basket: [],
    };
  }

  submitLogin(): void {
    Object.keys(this.interfaceLogin.controls).forEach(controlName => {
      this.interfaceLogin.get(controlName).markAsTouched();
    });
    if (this.interfaceLogin.valid) {
      if(
        this.interfaceLogin.value.userLogEmail == 'admin@mail.ru' &&
         this.interfaceLogin.value.userLogPassword == 'adminadmin'){
          localStorage.setItem('login','true')
          localStorage.setItem('admin','true')
        this.router.navigate(['admin/'])
        }
      this.currentUser = this.users.find(item => {
        if (item.email === this.interfaceLogin.value.userLogEmail && item.password === this.interfaceLogin.value.userLogPassword) {
          return item
        }
      })
      if (this.currentUser) {
        localStorage.setItem('login','true')
          localStorage.setItem('admin','false')
        this.router.navigate(['shop/', this.currentUser._id])
      }
    }
  }

  submitRegistration(): void {
    Object.keys(this.interfaceRegistration.controls).forEach(controlName => {
      this.interfaceRegistration.get(controlName).markAsTouched();
    });
    if (this.interfaceRegistration.valid) {
      if (this.interfaceRegistration.value.userRegPassword === this.interfaceRegistration.value.repeatRegPassword) {
        let newUser = this.userSharedService.addUser(this.interfaceRegistration.value)
        localStorage.setItem('login','true')
        localStorage.setItem('admin','false')
        this.router.navigate(['shop/', newUser._id])
      } else {
        this.interfaceRegistration.get('repeatRegPassword').setErrors({ passwordNotMatch: true })
      }
    } else {
      return;
    }
  }

  submitRecovery(): void {
    if (this.users.find(item => item.email === this.interfaceRecovery.value.userRecovEmail.trim())) {
      this.recoveryPass = 'Password sent to your mail'
      this.interfaceRecovery.reset()
      setTimeout(() => {
        this.recoveryPass = 'Go to the main page'
      }, 2000)
    } else {
      this.recoveryPass = 'User not found'
    }
  }
}
