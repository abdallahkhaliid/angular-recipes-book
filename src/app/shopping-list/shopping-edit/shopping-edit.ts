import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Ingredients } from '../../../shared/ingredients.model';
import { ShoppingListService } from '../../services/shopping-list';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  imports: [FormsModule],
  templateUrl: './shopping-edit.html',
  styleUrl: './shopping-edit.scss',
  standalone: true,
})
export class ShoppingEdit implements OnInit, OnDestroy {
  subscription!: Subscription;
  editedIndex!: number;
  editMode: boolean = false;
  editedItem!: Ingredients;

  @ViewChild('f', { static: true }) shoppingListForm!: NgForm;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editMode = true;
      this.editedIndex = index;
      this.editedItem = this.shoppingListService.getIngredientByIndex(index);
      this.shoppingListForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount,
      });
    });
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredients(value.name, value.amount);

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onDeleteItem() {
    if (this.editMode) {
      this.shoppingListService.deleteIngredientByIndex(this.editedIndex);
    }
    this.onClearItems();
  }

  onClearItems() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
