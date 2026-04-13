import { Injectable } from '@angular/core';
import { Ingredients } from '../../shared/ingredients.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredients: Ingredients[] = [new Ingredients('Apple', 5), new Ingredients('Banana', 10)];

  getIngredients() {
    return this.ingredients;
  }

  addIngredient(ingredient: Ingredients) {
    this.ingredients.push(ingredient);
  }

  // add multiple ingredients
  addIngredients(ingredients: Ingredients[]) {
    this.ingredients.push(...ingredients);
  }

  deleteIngredient(ingredient: Ingredients) {
    const index = this.ingredients.findIndex((ingredient) => ingredient.name === ingredient.name);
    if (index !== -1) {
      this.ingredients.splice(index, 1);
    }
  }

  clearIngredients() {
    this.ingredients = [];
  }
}
