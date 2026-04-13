import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-item',
  imports: [CommonModule],
  templateUrl: './recipe-item.html',
  styleUrl: './recipe-item.scss',
  standalone: true,
})
export class RecipeItem {
  @Input() recipe?: Recipe;
  @Output() recipeSelected = new EventEmitter<Recipe>();

  onRecipeSelected(recipe: Recipe) {
    this.recipeSelected.emit(recipe);
  }
}
