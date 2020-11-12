import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(public auth: AuthService, private dialog: MatDialog) {}

  ngOnInit() {}

  public logout(): void {
    this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { message: 'Confirm logout, love?', action: () => this.auth.logout() },
    });
  }
}
