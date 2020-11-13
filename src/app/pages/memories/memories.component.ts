import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NewMemoryDialogComponent } from 'src/app/components/new-memory-dialog/new-memory-dialog.component';
import { AlertService } from 'src/app/services/alert.service';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-memories',
  templateUrl: './memories.component.html',
  styleUrls: ['./memories.component.css'],
})
export class MemoriesComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public isLoading = false;
  public displayedColumns: string[] = ['index', 'title', 'age'];

  public dataSource = new MatTableDataSource<any>([]);

  constructor(
    private alert: AlertService,
    private dialog: MatDialog,
    private backend: BackendService,
  ) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.paginator.page.subscribe(() => this.onPageEvent());
    setTimeout(() => this.onPageEvent(), 0);
  }

  async onPageEvent(): Promise<void> {
    const limit = this.paginator.pageSize;
    const offset = this.paginator.pageIndex * this.paginator.pageSize;

    this.loadTable(limit, offset);
  }

  async loadTable(limit: number, offset: number): Promise<void> {
    this.isLoading = true;

    try {
      const results = await this.backend.getMemories({ limit, offset, skipBody: true });
      if (!results.data.docs || results.data.docs.length === 0) {
        throw new Error('No memories found.');
      }

      this.paginator.length = results.data.count;

      const data = results.data.docs.map((entry, index) => {
        return {
          id: entry.id,
          index: offset + index + 1,
          title: entry.title,
          age: new Date(entry.createdAt),
        };
      });

      this.paginator.pageIndex = offset / limit;
      this.dataSource = new MatTableDataSource(data);
    } catch (err) {
      this.alert.error(err.message);
    }

    this.isLoading = false;
  }

  applySearch(searchValue: string) {
    this.dataSource.filter = searchValue.trim().toLowerCase();
  }

  async onNewClick(): Promise<void> {
    this.dialog.open(NewMemoryDialogComponent, {
      width: '400px',
      data: { action: (title: string) => this.createMemory(title) },
    });
  }

  async createMemory(title: string): Promise<void> {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;

    try {
      await this.backend.createMemory(title, '');
      this.alert.success('Memory created.');

      await this.onPageEvent();
    } catch (err) {
      this.alert.error(err.message);
    }

    this.isLoading = false;
  }
}
