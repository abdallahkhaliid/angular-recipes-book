import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ShoppingListRoutingModule } from './shopping-list-routing-module';
import { ShoppingList } from '../shopping-list';
import { ShoppingEdit } from '../shopping-edit/shopping-edit';

@NgModule({
  declarations: [ShoppingList, ShoppingEdit],
  imports: [CommonModule, FormsModule, ShoppingListRoutingModule],
})
export class ShoppingListModule {}
