import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';

import { CommonModule } from '@angular/common';
import { Authentication } from './services/authentication';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
})
export class App {
  protected readonly title = signal('recipe-book');
  private authenticationService = inject(Authentication);

  constructor() {
    this.authenticationService.autoLogin();
  }
  // loadedFeature: string = 'recipe';

  // onNavigate(feature: string) {
  //   this.loadedFeature = feature;
  // }
}
