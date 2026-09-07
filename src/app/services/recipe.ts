import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredients } from '../../shared/ingredients.model';
import { ShoppingListService } from './shopping-list';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://placehold.co/600x400', [
      new Ingredients('Apple', 5),
      new Ingredients('Banana', 10),
    ]),
    new Recipe('Another Test Recipe', 'This is simply a test', 'https://placehold.co/600x400', [
      new Ingredients('Apple', 5),
      new Ingredients('Banana', 10),
    ]),
    new Recipe('Another Test Recipe', 'This is simply a test', 'https://placehold.co/600x400', [
      new Ingredients('Apple', 5),
      new Ingredients('Banana', 10),
    ]),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {}

  // (Subject) to make the component communicate with each other
  recipeSelected = new Subject<Recipe>();

  getRecipes() {
    return this.recipes;
  }

  addIngredientsToShoppingList(ingredients: Ingredients[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipeById(id: number) {
    return this.recipes[id];
  }
}
