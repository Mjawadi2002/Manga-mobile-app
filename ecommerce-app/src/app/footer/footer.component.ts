import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Injectable } from '@angular/core';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  constructor(private shared: SharedService, private router: Router) { }

  ngOnInit() {
    // Ensure sharedService is initialized before calling logout
    this.shared.initStorage().then(() => {
      console.log('Storage initialized');
    }).catch(error => {
      console.error('Error initializing storage:', error);
    });
  }

  logout() {
    this.shared.logout().subscribe(
      () => {
        // Upon successful logout, navigate to the login page
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error logging out:', error);
        // Handle error if needed
      }
    );
  }
  
}
