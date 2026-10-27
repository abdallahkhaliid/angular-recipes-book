import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../../services/recipe';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.html',
  styleUrl: './recipe-item.scss',
  standalone: false,
})
export class RecipeItem implements OnInit {
  @Input() recipe?: Recipe;
  @Input() index!: number;
  // @Output() recipeSelected = new EventEmitter<Recipe>();

  constructor(private recipeService: RecipeService) {}
  // onRecipeSelected(recipe: Recipe) {
  //   // this.recipeSelected.emit(recipe);
  //   this.recipeService.recipeSelected.emit(recipe);
  // }

  ngOnInit() {}
}
