import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../../services/recipe';

@Component({
  selector: 'app-recipe-item',
  imports: [CommonModule],
  templateUrl: './recipe-item.html',
  styleUrl: './recipe-item.scss',
  standalone: true,
})
export class RecipeItem implements OnInit {
  @Input() recipe?: Recipe;
  // @Output() recipeSelected = new EventEmitter<Recipe>();

  constructor(private recipeService: RecipeService) {}
  onRecipeSelected(recipe: Recipe) {
    // this.recipeSelected.emit(recipe);
    this.recipeService.recipeSelected.emit(recipe);
  }

  ngOnInit() {}
}
