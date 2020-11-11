import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private passwordKey = 'NC_PASSWORD';

  constructor(private router: Router) {}

  public isLoggedIn(): boolean {
    return !!localStorage.getItem(this.passwordKey);
  }

  public getPassword(): string {
    return localStorage.getItem(this.passwordKey);
  }

  public logout(): void {
    localStorage.removeItem(this.passwordKey);
    this.router.navigate(['/login']);
  }
}
