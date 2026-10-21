import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Datastorge } from '../services/datastorge';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true,
})
export class Header {
  isDropdownOpen = signal(false);

  private dataStorgeService = inject(Datastorge);
  private authenticationService = inject(Authentication);
  private router = inject(Router);

  user = this.authenticationService.user;

  onToggleDropdown() {
    this.isDropdownOpen.update((val) => !val);
  }

  onLogout() {
    this.authenticationService.logout();
    this.isDropdownOpen.set(false);
    this.router.navigate(['/auth']);
  }

  onSaveData() {
    // Logic to save data
    this.dataStorgeService.storeRecipes();
  }

  onFetchData() {
    // Logic to fetch data
    this.dataStorgeService.fetchRecipes();
  }
}
