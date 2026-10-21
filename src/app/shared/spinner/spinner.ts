import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  imports: [],
  template: `
    <div class="spinner-border text-primary" [class.spinner-border-sm]="small" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  `,
})
export class Spinner {
  @Input() small = false;
}
