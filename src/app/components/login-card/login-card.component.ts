import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend.service';
import { LoadingService } from 'src/app/services/loading.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.css'],
})
export class LoginCardComponent implements OnInit {
  public loginForm: FormGroup;
  public isLoading = false;

  constructor(
    private formBuiler: FormBuilder,
    private loader: LoadingService,
    private backend: BackendService,
    private alert: AlertService,
    private time: TimeService,
    private auth: AuthService,
    private router: Router,
  ) {
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

    const password = this.loginForm.value.password;

    try {
      const response = await this.backend.getNoraTime(password);

      this.time.setTime(response.time);
      this.auth.setPassword(password);

      this.router.navigate(['/home']);
      this.alert.info('Login successful.');
    } catch (err) {
      this.alert.error(err.message);
    }

    this.setLoading(false);
  }

  private setLoading(state: boolean): void {
    this.isLoading = state;

    state ? this.loader.addLoader() : this.loader.removeLoader();
    state ? this.loginForm.disable() : this.loginForm.enable();
  }
}
