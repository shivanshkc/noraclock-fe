import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadCounter = 0;

  constructor() {}

  public addLoader(): void {
    this.loadCounter++;
  }

  public removeLoader(): void {
    if (this.loadCounter === 0) {
      return;
    }

    this.loadCounter--;
  }

  public isLoading(): boolean {
    return this.loadCounter > 0;
  }
}
