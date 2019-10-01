import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/users/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { User, Info } from 'src/app/users/user.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  sub: Subscription;
  isLoggedIn: boolean;
  fname: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.sub = this.userService.isLogged.subscribe(o => {
      this.isLoggedIn = o.logged;
      this.fname = o.fname;
    });
  }

  logout() {
    this.userService.setLoggedIn(false);
    const user: Info<User> = this.userService.getUser();
    if (user) {
      localStorage.clear();
      localStorage.setItem('user', JSON.stringify({ user: user.user, isLogged: false }));
    }
    this.router.navigate(['/']);
  }

  onDestroy() {
    this.sub.unsubscribe();
  }

}
