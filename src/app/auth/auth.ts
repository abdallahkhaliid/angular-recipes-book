import { Component, DestroyRef, inject, signal, ViewChild, ViewContainerRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Alert } from '../alert/alert';
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

  private closeSub?: Subscription;
  private authenticationService = inject(Authentication);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  // @ViewChild('dynamicComponent', { read: ViewContainerRef }) dynamicComponent!: ViewContainerRef;

  @ViewChild('dynamicComponent', { read: ViewContainerRef }) dynamicComponent!: ViewContainerRef;

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading.set(true);

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
        this.showErrorAlert(error.message);
        console.error(error.message);
      },
    });
  }

  onSwitchMode() {
    this.isLoggedInMode = !this.isLoggedInMode;
  }

  private showErrorAlert(message: string) {
    //   const viewContainerRef = this.dynamicComponent;
    //   this.closeSub?.unsubscribe();
    //   viewContainerRef.clear();

    //   const alertComponentRef = viewContainerRef.createComponent(Alert);
    //   alertComponentRef.setInput('message', message);

    //   this.closeSub = alertComponentRef.instance.close
    //     .pipe(takeUntilDestroyed(this.destroyRef))
    //     .subscribe(() => {
    //       this.closeSub?.unsubscribe();
    //       viewContainerRef.clear();
    //     });
    // }
    this.dynamicComponent.clear();
    const componentRef = this.dynamicComponent.createComponent(Alert);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub?.unsubscribe();
      this.dynamicComponent.clear();
    });
  }
}
