import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ShoppingEdit } from './shopping-edit/shopping-edit';
import { Ingredients } from '../../shared/ingredients.model';
import { CommonModule } from '@angular/common';
import { ShoppingListService } from '../services/shopping-list';

@Component({
  selector: 'app-shopping-list',
  imports: [ShoppingEdit, CommonModule],
  templateUrl: './shopping-list.html',
  styleUrl: './shopping-list.scss',
  standalone: true,
})
export class ShoppingList implements OnInit {
  ingredients: Ingredients[] = [];

  // Dependency Injection
  constructor(private shoppingListService: ShoppingListService) {}

  // OnInit interface
  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
  }

  // onIngredientAdded event using service
  onIngredientAdded(ingredient: Ingredients) {
    this.shoppingListService.addIngredient(ingredient);
  }

  // onIngredientDeleted event using service
  onIngredientDeleted(ingredient: Ingredients) {
    this.shoppingListService.deleteIngredient(ingredient);
  }

  // onIngredientCleared event using service
  onIngredientCleared() {
    this.shoppingListService.clearIngredients();
  }
}
