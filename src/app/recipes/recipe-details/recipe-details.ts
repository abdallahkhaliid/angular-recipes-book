import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-details',
  imports: [],
  templateUrl: './recipe-details.html',
  styleUrl: './recipe-details.scss',
  standalone: true,
})
export class RecipeDetails {
  @Input() recipe?: Recipe;
}
