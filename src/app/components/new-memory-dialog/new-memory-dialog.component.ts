import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-new-memory-dialog',
  templateUrl: './new-memory-dialog.component.html',
  styleUrls: ['./new-memory-dialog.component.css'],
})
export class NewMemoryDialogComponent implements OnInit {
  public newMemoryForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { action: (title: string) => Promise<void> },
    private dialog: MatDialogRef<NewMemoryDialogComponent>,
    private formBuilder: FormBuilder,
  ) {
    this.newMemoryForm = this.formBuilder.group({
      title: ['', Validators.required],
    });
  }

  ngOnInit() {}

  async onSubmit(): Promise<void> {
    if (this.newMemoryForm.invalid) {
      return;
    }

    this.data.action(this.newMemoryForm.value.title);
    this.dialog.close();
  }
}
