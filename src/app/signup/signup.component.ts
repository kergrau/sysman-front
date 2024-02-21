import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserForm } from 'src/app/interfaces/forms/user-form';
import { RegisterRequest } from 'src/app/interfaces/register-request';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [MessageService],
})
export class SignupComponent implements OnInit {
  declare form: FormGroup<UserForm>;
  registerRequest!: RegisterRequest;

  fileRut: File | undefined;
  fileDni: File | undefined;
  fileBankRef: File | undefined;
  fileSign: File | undefined;
  uploadRut: boolean = false;
  uploadDni: boolean = false;
  uploadBankRef: boolean = false;
  uploadSign: boolean = false;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initSignUpForm();
  }

  initSignUpForm(): void {
    this.form = this.fb.nonNullable.group(
      {
        email: [
          '',
          [Validators.required, Validators.email, Validators.maxLength(50)],
        ],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.pattern(/^[a-zA-Z0-9]+$/),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(16),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.matchPassword('password', 'confirmPassword'),
      }
    );
  }

  matchPassword(controlName: string, matchingControlName: string): ValidatorFn {
    return (abstractControl: AbstractControl) => {
      const control = abstractControl.get(controlName);
      const matchingControl = abstractControl.get(matchingControlName);

      if (
        matchingControl!.errors &&
        !matchingControl!.errors?.['matchPassword']
      ) {
        return null;
      }

      if (control!.value !== matchingControl!.value) {
        const error = { matchPassword: true };
        matchingControl!.setErrors(error);
        return error;
      } else {
        matchingControl!.setErrors(null);
        return null;
      }
    };
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.registerRequest = this.form.getRawValue();
    this.loading = true;
    this.authService.signUp(this.registerRequest).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'New user created successfully',
        });
        this.router.navigate(['/login']);
      },
      error: (err) => console.error('Error ->', err),
    });
  }
}
