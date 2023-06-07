import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isAuthenticate(){
    if(localStorage.getItem('adminToken'))
      return true;
    return false;
  }
}
