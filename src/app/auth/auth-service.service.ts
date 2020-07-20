import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  getLocalStorageLogin(): string {
    return localStorage.getItem('login')
  }

  getLocalStorageAdmin(): string {
    return localStorage.getItem('admin')
  }
}
