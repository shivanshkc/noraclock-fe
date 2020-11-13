import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import * as moment from 'moment';
import 'moment-precise-range-plugin';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { TimeService } from 'src/app/services/time.service';

import * as configs from '../../../assets/configs.json';
import { preciseDiff } from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0,
        }),
      ),
      transition('void <=> *', animate(1000)),
    ]),
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  private durationObserver: Observable<void>;
  private subscription: Subscription;

  public cardHeight = '0px';
  public phrase = configs.data.phrases[Math.floor(Math.random() * configs.data.phrases.length)];

  public year = '0';
  public month = '0';
  public day = '0';
  public hour = '0';
  public minute = '0';
  public second = '0';

  constructor(private time: TimeService, private auth: AuthService, private alert: AlertService) {}

  ngOnInit() {
    setTimeout(() => this.onResize(null), 0);

    const time = this.time.getTime();

    if (!this.isTimeValid()) {
      this.alert.error('Invalid time detected.');
      this.auth.logout();
    }

    this.durationObserver = new Observable((subscriber: Subscriber<any>) => {
      setInterval(() => {
        subscriber.next();
      }, 500);
    });

    this.subscription = this.durationObserver.subscribe(() => {
      const diff = preciseDiff(moment(time), moment(Date.now()), true);

      this.year = diff.years < 10 ? `0${diff.years}` : `${diff.years}`;
      this.month = diff.months < 10 ? `0${diff.months}` : `${diff.months}`;
      this.day = diff.days < 10 ? `0${diff.days}` : `${diff.days}`;
      this.hour = diff.hours < 10 ? `0${diff.hours}` : `${diff.hours}`;
      this.minute = diff.minutes < 10 ? `0${diff.minutes}` : `${diff.minutes}`;
      this.second = diff.seconds < 10 ? `0${diff.seconds}` : `${diff.seconds}`;
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

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const year = document.getElementById('year-card');
    this.cardHeight = `${year.clientWidth}px`;
  }
}
