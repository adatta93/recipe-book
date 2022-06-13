import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Ingredient } from "../ingredient.model";
import { ShoppingService } from "../shopping.service";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"]
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild("form", { static: true }) form: NgForm;
  editMode: boolean = false;
  editIndex: number;

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit() {
    this.shoppingService.editIngredients.subscribe((index: number) => {
      const ing: Ingredient = this.shoppingService.getIngredient(index);
      this.form.setValue({
        name: ing.name,
        amount: ing.amount
      });
      this.editMode = true;
      this.editIndex = index;
    });
  }

  onSubmit() {
    console.log(this.form);
    const { name, amount } = this.form.value;
    if (this.editMode) {
      this.shoppingService.updateIngredient(this.editIndex, { name, amount });
    } else {
      this.shoppingService.setIngredient({ name, amount });
    }
    this.clearForm();
  }

  onDelete() {
    this.shoppingService.deleteIngredient(this.editIndex);
    this.clearForm();
  }

  clearForm() {
    this.form.reset();
    this.editMode = false;
  }
}
