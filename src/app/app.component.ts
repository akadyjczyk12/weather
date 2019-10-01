import { Component, OnInit } from '@angular/core';
import { UserService } from './users/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    if (this.userService.getUser().isLogged) {
      this.userService.setLoggedIn(true);
    } else {
      this.userService.setLoggedIn(false);
    }
  }
}
