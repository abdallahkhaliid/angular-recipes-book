import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../../services/recipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-details',
  imports: [CommonModule],
  templateUrl: './recipe-details.html',
  styleUrl: './recipe-details.scss',
  standalone: true,
})
export class RecipeDetails {
  @Input() recipe?: Recipe;

  constructor(private recipeService: RecipeService) {}

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe?.ingredients || []);
  }
}
