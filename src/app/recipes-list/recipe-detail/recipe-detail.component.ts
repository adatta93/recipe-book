import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Ingredient } from "src/app/shopping-list/ingredient.model";
import { ShoppingService } from "src/app/shopping-list/shopping.service";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"]
})
export class RecipeDetailComponent implements OnInit {
  selectedRecipe: Recipe;
  recipeId: string;

  constructor(
    private recipeService: RecipeService,
    private shoppingService: ShoppingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.selectedRecipe = this.recipeService.getRecipe(param.id);
      this.recipeId = param.id;
    });
  }

  toShoppingList() {
    this.selectedRecipe.ingredients.forEach((ing: Ingredient) => {
      this.shoppingService.setIngredient(ing);
      this.router.navigate(["/shopping"]);
    });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.recipeId);
    this.router.navigate(["/recipes"]);
  }
}
