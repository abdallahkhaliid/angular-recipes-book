import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ShoppingEdit } from './shopping-edit/shopping-edit';
import { Ingredients } from '../../shared/ingredients.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopping-list',
  imports: [ShoppingEdit, CommonModule],
  templateUrl: './shopping-list.html',
  styleUrl: './shopping-list.scss',
  standalone: true,
})
export class ShoppingList {
  ingredients: Ingredients[] = [new Ingredients('Apple', 5), new Ingredients('Banana', 10)];

  onIngredientAdded(ingredient: Ingredients) {
    this.ingredients.push(ingredient);
  }

  onIngredientDeleted(ingredient: Ingredients) {
    const index = this.ingredients.findIndex((ingredient) => ingredient.name === ingredient.name);
    if (index !== -1) {
      this.ingredients.splice(index, 1);
    }
  }

  onIngredientCleared() {
    this.ingredients = [];
  }
}
