import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-header',
  templateUrl: './loading-header.component.html',
  styleUrls: ['./loading-header.component.css'],
})
export class LoadingHeaderComponent implements OnInit {
  @Input() value = '';
  @Input() public isLoading = false;

  constructor() {}

  ngOnInit() {}
}
