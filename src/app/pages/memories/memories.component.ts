import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private router: Router,
    private alert: AlertService,
    private dialog: MatDialog,
    private backend: BackendService,
  ) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.paginator.page.subscribe(() => this.onPageEvent());

    setTimeout(() => {
      this.route.queryParams.subscribe((_) => this.loadTable());
    }, 0);
  }

  async onPageEvent(): Promise<void> {
    const limit = this.paginator.pageSize;
    const offset = this.paginator.pageIndex * this.paginator.pageSize;

    this.router.navigate([], { queryParams: { limit, offset } });
  }

  async loadTable(): Promise<void> {
    const queries = await this.getQueries();

    const limit = Math.abs(parseInt(queries.limit, 10)) || 10;
    const offset = Math.abs(parseInt(queries.offset, 10)) || 0;

    this.isLoading = true;

    try {
      const results = await this.backend.getMemories({ limit, offset, skipBody: true });
      if (!results.data.docs || results.data.docs.length === 0) {
        throw new Error('No memories found.');
      }

      this.paginator.length = results.data.count;

      const data = results.data.docs.map((entry, index) => {
        return { index: index + 1, title: entry.title, age: new Date(entry.createdAt) };
      });

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

  async createMemory(title: string): Promise<void> {}

  async getQueries(): Promise<{ [key: string]: string }> {
    return new Promise((resolve) => {
      this.route.queryParams.subscribe((params) => {
        resolve(params);
      });
    });
  }
}
