import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AlertSnackbarComponent } from '../components/alert-snackbar/alert-snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private snackbar: MatSnackBar) {}

  public success(message: string): void {
    this.alert(message, 'favorite', 'accent');
  }

  public info(message: string): void {
    this.alert(message, 'info', 'primary');
  }

  public error(message: string): void {
    this.alert(message, 'sick', 'warn');
  }

  private alert(message: string, iconName: string, color: string): void {
    this.snackbar.openFromComponent(AlertSnackbarComponent, {
      data: { iconName, message, color },
      duration: 2500,
    });
  }
}
