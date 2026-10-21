import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from './recipe';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class Datastorge {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
  ) {}

  storeRecipes() {
    // Implementation for storing recipes
    const recipes = this.recipeService.getRecipes();
    this.http
      .put('https://recipes-project-20396-default-rtdb.firebaseio.com/recipes.json', recipes)
      .subscribe(
        (response) => {
          console.log('Recipes stored successfully:', response);
        },
        (error) => {
          console.error('Error storing recipes:', error);
        },
      );
  }

  fetchRecipes() {
    // Implementation for fetching recipes
    this.http
      .get<Recipe[]>('https://recipes-project-20396-default-rtdb.firebaseio.com/recipes.json')
      .subscribe(
        (recipes) => {
          this.recipeService.setRecipes(recipes);
          console.log('Recipes fetched successfully:', recipes);
        },
        (error) => {
          console.error('Error fetching recipes:', error);
        },
      );
  }
}
