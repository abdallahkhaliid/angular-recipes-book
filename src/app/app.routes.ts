import { Routes } from '@angular/router';
import { Recipes } from './recipes/recipes';
import { ShoppingList } from './shopping-list/shopping-list';
import { RecipeStart } from './recipes/recipe-start/recipe-start';
import { RecipeDetails } from './recipes/recipe-details/recipe-details';
import { RecipeEdit } from './recipes/recipe-edit/recipe-edit';

export const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: Recipes,
    children: [
      { path: '', component: RecipeStart },
      { path: 'new', component: RecipeEdit },
      { path: ':id', component: RecipeDetails },
      { path: ':id/edit', component: RecipeEdit },
    ],
  },
  { path: 'shopping-list', component: ShoppingList },
];
