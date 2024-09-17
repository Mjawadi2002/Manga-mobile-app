// login.page.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userLog: any = {
    email: '',
    password: ''
  };
  errorMessage: string = '';

  constructor(private router: Router, public shared: SharedService) { }

  login() {
    if (!this.userLog.email || !this.userLog.password) {
      this.errorMessage = 'Please provide both email and password';
      return;
    }

    this.shared.login(this.userLog.email, this.userLog.password).subscribe(
      res => {
        console.log("niceeuuuu");
        this.router.navigate(['./home']);
      },
      err => {
        console.log("error");
        this.errorMessage = err;
      }
    );
  }

  ngOnInit() {
    this.shared.logout();
  }
}
