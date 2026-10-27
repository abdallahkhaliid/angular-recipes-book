import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../../services/recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss',
  standalone: false,
})

// Implement OnInit interface
export class RecipeList implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  private recipesSub!: Subscription;

  // Dependency Injection
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  // OnInit interface
  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipesSub = this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
  }

  ngOnDestroy(): void {
    this.recipesSub.unsubscribe();
  }

  // onRecipeSelected(recipe: Recipe) {
  //   this.recipeSelected.emit(recipe);
  // }

  // Create new recipe and navigate to the edit page
  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
