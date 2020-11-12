import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-memories',
  templateUrl: './memories.component.html',
  styleUrls: ['./memories.component.css'],
})
export class MemoriesComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public isLoading = false;
  public displayedColumns: string[] = ['index', 'title', 'age'];

  public dataSource = new MatTableDataSource<any>([
    { index: 1, title: 'Something', age: new Date() },
    { index: 2, title: 'Another', age: new Date() },
    { index: 3, title: 'Right', age: new Date() },
    { index: 4, title: 'Okay', age: new Date() },
    { index: 5, title: 'Cool', age: new Date() },
    { index: 6, title: 'Write', age: new Date() },
  ]);

  constructor() {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  applySearch(searchValue: string) {
    this.dataSource.filter = searchValue.trim().toLowerCase();
  }
}
