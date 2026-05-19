import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeItem } from './recipe-item/recipe-item';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../../services/recipe';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeItem, CommonModule],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss',
  standalone: true,
})

// Implement OnInit interface
export class RecipeList implements OnInit {
  @Output() recipeSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [];

  // Dependency Injection
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  // OnInit interface
  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  // onRecipeSelected(recipe: Recipe) {
  //   this.recipeSelected.emit(recipe);
  // }

  // Create new recipe and navigate to the edit page
  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
