import { Component, OnInit } from '@angular/core';
import { User } from '../user.interface';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: User;
  isAdmin: boolean;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getUser().user;
    this.isAdmin = this.userService.isAdmin;
  }

}
