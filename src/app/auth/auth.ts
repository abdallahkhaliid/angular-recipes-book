import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Authentication } from '../services/authentication';
import { Spinner } from '../shared/spinner/spinner';

@Component({
  selector: 'app-auth',
  imports: [FormsModule, Spinner],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  isLoggedInMode = true;
  email = '';
  password = '';
  isLoading = signal(false);
  errorMessage = signal('');

  private authenticationService = inject(Authentication);
  private router = inject(Router);

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading.set(true);
    this.errorMessage.set('');

    const request$ = this.isLoggedInMode
      ? this.authenticationService.login(email, password)
      : this.authenticationService.signup(email, password);

    request$.subscribe({
      next: (data) => {
        console.log(this.isLoggedInMode ? 'Logged in:' : 'Signed up:', data);
        this.isLoading.set(false);
        form.reset();
        this.router.navigate(['/recipes']);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.errorMessage.set(error.message);
        console.error(error.message);
      },
    });
  }

  onSwitchMode() {
    this.isLoggedInMode = !this.isLoggedInMode;
    this.errorMessage.set('');
  }
}
