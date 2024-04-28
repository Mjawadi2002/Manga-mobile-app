import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userData: any;

  constructor(private shared: SharedService) {}

  ngOnInit() {
    // Call a method to fetch user profile data when the component initializes
    this.getUserProfile();
  }

  getUserProfile() {
    // Call the getUserProfile method from the SharedService
    this.shared.getUserProfile()
      .subscribe(
        (response) => {
          // Handle successful response
          this.userData = response;
        },
        (error) => {
          // Handle error
          console.error('Error fetching user profile:', error);
        }
      );
  }

  // You can add other methods as needed
}
