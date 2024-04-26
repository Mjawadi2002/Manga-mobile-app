// signup.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  user: any = {
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
  };

  constructor(private router: Router, public shared: SharedService) {}

  signUp() {
    this.shared.signUp(this.user).subscribe(
      res => {
        console.log("Signup successful!", res);
        this.user = {
          username: '',
          email: '',
          password: '',
          phoneNumber: ''
        };
        this.router.navigate(['./home']);
      },
      err => {
        console.error("Error signing up:", err);
      }
    );
  }

  ngOnInit(): void {}
}
