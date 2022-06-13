import { Subject } from "rxjs";
import { Ingredient } from "./ingredient.model";

export class ShoppingService {
  private ingredients: Ingredient[] = [
    new Ingredient("Chicken", 1),
    new Ingredient("Cheese", 500)
  ];
  ingredientsChanged = new Subject<Ingredient[]>();
  editIngredients = new Subject<number>();

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  getIngredient(index): Ingredient {
    return this.ingredients.slice(index, index + 1)[0];
  }

  setIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, updateValue: Ingredient) {
    this.ingredients[index] = updateValue;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
