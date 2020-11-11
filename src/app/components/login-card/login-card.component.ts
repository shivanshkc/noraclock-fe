import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.css'],
})
export class LoginCardComponent implements OnInit {
  public loginForm: FormGroup;
  public isLoading = false;

  constructor(private formBuiler: FormBuilder, private loader: LoadingService) {
    this.loginForm = this.formBuiler.group({
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  async login(): Promise<void> {
    if (this.loginForm.invalid) {
      return;
    }

    this.setLoading(true);

    try {
    } catch (err) {}

    this.setLoading(false);
  }

  private setLoading(state: boolean): void {
    this.isLoading = state;
    state ? this.loginForm.disable() : this.loginForm.enable();
  }
}
