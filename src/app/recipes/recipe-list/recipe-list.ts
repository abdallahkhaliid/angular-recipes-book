import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeItem } from './recipe-item/recipe-item';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeItem, CommonModule],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss',
  standalone: true,
})
export class RecipeList {
  @Output() recipeSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://placehold.co/600x400'),
    new Recipe('Another Test Recipe', 'This is simply a test', 'https://placehold.co/600x400'),
    new Recipe('Another Test Recipe', 'This is simply a test', 'https://placehold.co/600x400'),
  ];

  onRecipeSelected(recipe: Recipe) {
    this.recipeSelected.emit(recipe);
  }
}
