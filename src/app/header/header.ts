import { Component, EventEmitter, Output, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true,
})
export class Header {
  isDropdownOpen = signal(false);
  @Output() featureSelected = new EventEmitter<string>();
  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  onToggleDropdown() {
    this.isDropdownOpen.update((val) => !val);
  }
}
