import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    loadChildren: () => import('./recipes/recipes/recipes-module').then((m) => m.RecipesModule),
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./shopping-list/shopping-list/shopping-list-module').then(
        (m) => m.ShoppingListModule,
      ),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth/auth-module').then((m) => m.AuthModule),
  },
];
