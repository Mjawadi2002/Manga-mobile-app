import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  constructor(private sharedService: SharedService, private router: Router) { }

  ngOnInit() {
    // Ensure sharedService is initialized before calling logout
    this.sharedService.initStorage().then(() => {
      console.log('Storage initialized');
    }).catch(error => {
      console.error('Error initializing storage:', error);
    });
  }

  logout() {
    this.sharedService.logout().subscribe(
      () => {
        // Successful logout
        // Redirect or clear state here
        // For example:
        this.router.navigate(['/login']);
      },
      (error) => {
        // Error handling
        console.error('Logout error:', error);
      }
    );
  }
}
