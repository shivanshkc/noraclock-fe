import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}

  async canActivate(): Promise<boolean> {
    const isLoggedIn = this.auth.isLoggedIn();

    if (!isLoggedIn) {
      await this.router.navigate(['/login']);
    }
    return isLoggedIn;
  }
}
