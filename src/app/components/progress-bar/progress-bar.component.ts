import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
})
export class ProgressBarComponent implements OnInit {
  constructor(public loader: LoadingService) {}

  ngOnInit() {}

  public isAllowed(): boolean {
    return this.loader && this.loader.isLoading();
  }
}
