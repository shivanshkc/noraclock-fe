import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { memory } from 'console';
import { AlertService } from 'src/app/services/alert.service';
import { BackendService } from 'src/app/services/backend.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css'],
})
export class MemoryComponent implements OnInit {
  public memoryForm: FormGroup;
  public tEdit = false;
  public bEdit = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private alert: AlertService,
    private loader: LoadingService,
    private backend: BackendService,
  ) {
    this.memoryForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: [''],
    });
  }

  async ngOnInit() {
    const memoryID = await this.getMemoryID();

    if (!memoryID) {
      this.alert.error('Invalid memory.');
      return;
    }

    this.setLoading(true);

    try {
      const results = await this.backend.getMemoryByID(memoryID);

      this.memoryForm.get('title').setValue(results.data.title);
      this.memoryForm.get('body').setValue(results.data.body);
    } catch (err) {
      this.alert.error(err.message);
    }

    this.setLoading(false);
  }

  async updateMemory(): Promise<void> {
    if (this.loader.isLoading()) {
      return;
    }
    if (this.memoryForm.invalid) {
      return;
    }

    this.tEdit = false;
    this.bEdit = false;
    this.loader.addLoader();

    const memoryID = await this.getMemoryID();
    const { title, body } = this.memoryForm.value;

    try {
      await this.backend.updateMemory(memoryID, { title, body });
      this.alert.info('Memory updated.');
    } catch (err) {
      this.alert.error(err.message);
    }

    this.loader.removeLoader();
  }

  async deleteMemory(): Promise<void> {
    console.log('Delete!');
  }

  async getMemoryID(): Promise<string> {
    return new Promise((resolve) => {
      this.router.params.subscribe((params) => {
        resolve(params.memoryID);
      });
    });
  }

  private setLoading(state: boolean): void {
    if (state) {
      this.loader.addLoader();
      this.tEdit = false;
      this.bEdit = false;
      return;
    }

    this.loader.removeLoader();
  }
}
