import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private durationObserver: Observable<Date>;
  private subscription: Subscription;

  public year = 0;
  public month = 0;
  public day = 0;
  public hour = 0;
  public minute = 0;
  public second = 0;

  constructor(private time: TimeService, private auth: AuthService, private alert: AlertService) {}

  ngOnInit() {
    const time = this.time.getTime();

    if (!this.isTimeValid()) {
      this.alert.error('Invalid time detected.');
      this.auth.logout();
    }

    this.durationObserver = new Observable((subscriber: Subscriber<any>) => {
      setInterval(() => {
        subscriber.next(new Date(Date.now() - time));
      }, 500);
    });

    this.subscription = this.durationObserver.subscribe((value: Date) => {
      const epoch = new Date(0);

      this.year = value.getFullYear() - epoch.getFullYear();

      const month = value.getMonth() - epoch.getMonth();
      this.month = month < 0 ? month + 12 : month;

      const day = value.getDay() - epoch.getDay();
      this.day = day < 0 ? day + 365 : day;

      const hour = value.getHours() - epoch.getHours();
      this.hour = hour < 0 ? hour + 24 : hour;

      const minute = value.getMinutes() - epoch.getMinutes();
      this.minute = minute < 0 ? minute + 60 : minute;

      const second = value.getSeconds() - epoch.getSeconds();
      this.second = second < 0 ? second + 60 : second;
    });
  }

  private isTimeValid(): boolean {
    const noraTime = this.time.getTime();
    if (!noraTime || isNaN(noraTime)) {
      return false;
    }

    const date = new Date(noraTime).getTime();
    if (isNaN(date)) {
      return false;
    }

    return true;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
