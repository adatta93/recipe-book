import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { RecipeService } from "../recipe.service";
import { Recipe } from "../recipe.model";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "recipe-edit.component.html",
  styleUrls: ["recipe-edit.component.css"]
})
export class RecipeEditComponent implements OnInit {
  id: string;
  isEdit: boolean;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.id = param.id;
      this.isEdit = !!param.id;
      console.log(this.isEdit);
      this.initForm();
    });
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  onSubmit() {
    console.log(this.recipeForm);
    const newRecipeId = this.isEdit
      ? this.id
      : (this.recipeService.getRecipes().length + 1).toString();
    const newRecipe = new Recipe(
      newRecipeId,
      this.recipeForm.value["name"],
      this.recipeForm.value["description"],
      this.recipeForm.value["imagePath"],
      this.recipeForm.value["ingredients"]
    );
    if (this.isEdit) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get("ingredients")).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIng(index) {
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(index);
  }

  private initForm() {
    let nameEdit = "";
    let imagePathEdit = "";
    let descriptionEdit = "";
    let ingredientsEdit = new FormArray([]);
    if (this.isEdit) {
      const recipe: Recipe = this.recipeService.getRecipe(this.id);
      const { name, imagePath, description } = recipe;
      nameEdit = name;
      imagePathEdit = imagePath;
      descriptionEdit = description;
      if (recipe["ingredients"]) {
        for (let ing of recipe.ingredients) {
          ingredientsEdit.push(
            new FormGroup({
              name: new FormControl(ing.name, Validators.required),
              amount: new FormControl(ing.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(nameEdit, Validators.required),
      imagePath: new FormControl(imagePathEdit, Validators.required),
      description: new FormControl(descriptionEdit, Validators.required),
      ingredients: ingredientsEdit
    });
  }
}
