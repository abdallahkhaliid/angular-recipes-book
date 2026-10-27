import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RecipesRoutingModule } from './recipes-routing-module';
import { Recipes } from '../recipes';
import { RecipeList } from '../recipe-list/recipe-list';
import { RecipeItem } from '../recipe-list/recipe-item/recipe-item';
import { RecipeDetails } from '../recipe-details/recipe-details';
import { RecipeEdit } from '../recipe-edit/recipe-edit';
import { RecipeStart } from '../recipe-start/recipe-start';

@NgModule({
  declarations: [Recipes, RecipeList, RecipeItem, RecipeDetails, RecipeEdit, RecipeStart],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RecipesRoutingModule],

  exports: [Recipes, RecipeList, RecipeItem, RecipeDetails, RecipeEdit, RecipeStart],
})
export class RecipesModule {}
