import { Recipe } from "./recipe.model";
import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shopping-list/ingredient.model";
import { Subject } from "rxjs";

export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      "1",
      "Meat",
      "BBQ Meat",
      "https://images.unsplash.com/photo-1570466199055-0636c78a499d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80",
      [new Ingredient("Chicken", 1), new Ingredient("BBQ Sauce", 2)]
    ),
    new Recipe(
      "2",
      "Veg Nachos",
      "Nachos with cheese",
      "https://images.unsplash.com/photo-1570466199012-e4e9ca168641?ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80",
      [new Ingredient("Beans", 20), new Ingredient("Cheese", 2)]
    )
  ];

  public recipeChanged = new Subject<Recipe[]>();

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id) {
    return this.recipes.find(recipe => recipe.id === id);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    console.log(this.recipes);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(id, newRecipe: Recipe) {
    this.recipes.forEach(recipe => {
      if (recipe.id === id) {
        Object.assign(recipe, newRecipe);
      }
    });
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(id) {
    const recipeToSearch = this.recipes.find(recipe => recipe.id === id);
    const index = this.recipes.indexOf(recipeToSearch);
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
