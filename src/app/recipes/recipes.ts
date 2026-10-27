import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from '../services/recipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.html',
  styleUrl: './recipes.scss',
  standalone: false,
})
export class Recipes implements OnInit, OnDestroy {
  selectedRecipe?: Recipe;

  recipeSubscription?: Subscription;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeSubscription = this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
      this.selectedRecipe = recipe;
    });
  }
  ngOnDestroy() {
    this.recipeSubscription?.unsubscribe();
  }

  // onRecipeSelected(recipe: Recipe) {
  //   this.selectedRecipe = recipe;
  // }
}
