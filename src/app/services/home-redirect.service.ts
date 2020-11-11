import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class HomeRedirectService {
  constructor(private router: Router, private auth: AuthService) {}

  async canActivate(): Promise<boolean> {
    const isLoggedOut = !this.auth.isLoggedIn();

    if (!isLoggedOut) {
      await this.router.navigate(['/home']);
    }
    return isLoggedOut;
  }
}
