import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredients } from '../../../shared/ingredients.model';
import { ShoppingListService } from '../../services/shopping-list';

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

  constructor(private shoppingListService: ShoppingListService) {}

  onAddItem(name: string, amount: number) {
    this.shoppingListService.addIngredient(new Ingredients(name, amount));
  }

  onDeleteItem(name: string, amount: number) {
    this.shoppingListService.deleteIngredient(new Ingredients(name, amount));
  }

  onClearItems() {
    this.shoppingListService.clearIngredients();
  }
}
