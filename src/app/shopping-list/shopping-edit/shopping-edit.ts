import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredients } from '../../../shared/ingredients.model';

@Component({
  selector: 'app-shopping-edit',
  imports: [],
  templateUrl: './shopping-edit.html',
  styleUrl: './shopping-edit.scss',
  standalone: true,
})
export class ShoppingEdit {
  @ViewChild('name', { static: true }) name!: ElementRef;
  @ViewChild('amount', { static: true }) amount!: ElementRef;

  @Output() ingredientAdded = new EventEmitter<Ingredients>();
  @Output() ingredientDeleted = new EventEmitter<Ingredients>();
  @Output() ingredientCleared = new EventEmitter<void>();

  onAddItem(name: string, amount: number) {
    this.ingredientAdded.emit(new Ingredients(name, amount));
  }

  onDeleteItem(name: string, amount: number) {
    this.ingredientDeleted.emit(new Ingredients(name, amount));
  }

  onClearItems() {
    this.ingredientCleared.emit();
  }
}
