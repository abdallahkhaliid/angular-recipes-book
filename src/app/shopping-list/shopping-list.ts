import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredients } from '../../shared/ingredients.model';
import { ShoppingListService } from '../services/shopping-list';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.html',
  styleUrl: './shopping-list.scss',
  standalone: false,
})
export class ShoppingList implements OnInit, OnDestroy {
  ingredients: Ingredients[] = [];
  private ingredientsSub!: Subscription;

  // Dependency Injection
  constructor(private shoppingListService: ShoppingListService) {}

  // OnInit interface
  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientsSub = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredients[]) => {
        this.ingredients = ingredients;
      },
    );
  }

  ngOnDestroy(): void {
    this.ingredientsSub.unsubscribe();
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

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }
}
