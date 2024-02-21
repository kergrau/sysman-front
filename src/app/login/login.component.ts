import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginForm } from '../interfaces/forms/login-form';
import { LoginRequest } from '../interfaces/login-request';
import { AuthService } from '../services/auth.service';
import { LoginResponse } from '../interfaces/login-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  declare form: FormGroup<LoginForm>;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.form = this.fb.nonNullable.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.loading = true;
    let params: LoginRequest = this.form.getRawValue();
    this.authService.signIn(params).subscribe({
      next: (result: LoginResponse) => {
        this.loading = false;
        localStorage.setItem('token', result.token);
        this.router.navigate(['/dashboard']);
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
}
