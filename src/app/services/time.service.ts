import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  private timeKey = 'NC_TIME';

  constructor() {}

  public getTime(): number {
    return parseInt(localStorage.getItem(this.timeKey), 10);
  }

  public setTime(time: number): void {
    localStorage.setItem(this.timeKey, `${time}`);
  }
}
