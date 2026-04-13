import { Component } from '@angular/core';
import { RecipeList } from './recipe-list/recipe-list';
import { RecipeDetails } from './recipe-details/recipe-details';
import { Recipe } from './recipe.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipes',
  imports: [RecipeList, RecipeDetails, CommonModule],
  templateUrl: './recipes.html',
  styleUrl: './recipes.scss',
  standalone: true,
})
export class Recipes {
  selectedRecipe?: Recipe;

  onRecipeSelected(recipe: Recipe) {
    this.selectedRecipe = recipe;
  }
}
