import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User, Info } from './user.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import adminData from '../../assets/users.json';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private logged = new BehaviorSubject<any>({ logged: false, fname: '' });

  constructor() { }

  getUser(): Info<User> {
    const userObj = localStorage.getItem('user');
    return userObj ? JSON.parse(userObj) : { isLogged: false };
  }

  register(form: FormGroup): boolean {
    localStorage.setItem('user', JSON.stringify({ user: form.value, isLogged: false }));
    return localStorage.getItem('user') != null;
  }

  login(userObj: Info<User>, form: FormGroup): boolean {
    const email = form.get('email').value;
    const password = form.get('password').value;
    const admin: User = adminData[0];
    if (email === admin.email && password === admin.password) {
      this.setLoggedIn(true);
      this.logged.next({ logged: true, fname: userObj.user.fname });
      localStorage.setItem('user', JSON.stringify({ user: adminData[0], isLogged: true, role: 'admin' }));
      return true;
    }

    if (userObj.user.email === email && userObj.user.password === password) {
      this.setLoggedIn(true);
      this.logged.next({ logged: true, fname: userObj.user.fname });
      localStorage.setItem('user', JSON.stringify({ user: userObj.user, isLogged: true }));
      return true;
    } else {
      console.log('zle haslo lub email');
      return false;
    }
  }

  get isLogged(): Observable<any> {
    return this.logged.asObservable();
  }

  get isAdmin(): boolean {
    return this.getUser().role === 'admin' ? true : false;
  }

  /** Ustawia usera aby był zalogowany lub nie */
  setLoggedIn(shouldByLogged: boolean) {
    if (shouldByLogged) {
      this.logged.next({ logged: true, fname: this.getUser().user.fname });
    } else {
      this.logged.next({ logged: false, fname: '' });
    }
  }
}
