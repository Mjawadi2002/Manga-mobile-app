// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private sharedService: SharedService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.sharedService.isLoggedIn().then(isLoggedIn => {
      if (isLoggedIn) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    });
  }
}
