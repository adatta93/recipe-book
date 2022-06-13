import { Component, OnInit } from "@angular/core";
import { Ingredient } from "./ingredient.model";
import { ShoppingService } from "./shopping.service";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"]
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredients();
    this.shoppingService.ingredientsChanged.subscribe((ing: Ingredient[]) => {
      this.ingredients = ing;
    });
  }

  onSelect(index: number) {
    this.shoppingService.editIngredients.next(index);
  }
}
