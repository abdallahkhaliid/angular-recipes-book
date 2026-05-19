import { Component, OnInit } from '@angular/core';
import { RecipeList } from './recipe-list/recipe-list';
import { RecipeDetails } from './recipe-details/recipe-details';
import { Recipe } from './recipe.model';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../services/recipe';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-recipes',
  imports: [RecipeList, RouterOutlet, CommonModule],
  templateUrl: './recipes.html',
  styleUrl: './recipes.scss',
  standalone: true,
})
export class Recipes implements OnInit {
  selectedRecipe?: Recipe;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
      this.selectedRecipe = recipe;
    });
  }

  // onRecipeSelected(recipe: Recipe) {
  //   this.selectedRecipe = recipe;
  // }
}
