import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userData: any;
  user: any;
  errorMessage: any;

  constructor(private shared: SharedService) {}

  ngOnInit() {
    this.shared.initStorage().then(() => {
      console.log('Storage initialized');
    }).catch(error => {
      console.error('Error initializing storage:', error);
    });
    // Call a method to fetch user profile data when the component initializes
    this.getUser();
  }

  getUser(): void {
    this.shared.getUser().subscribe({
      next: user => this.userData = this.userData,
      error: err => this.errorMessage = err
    });
  }

  // You can add other methods as needed
}
