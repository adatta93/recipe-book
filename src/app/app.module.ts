import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { AuthService } from "./auth.service";
import { DropdownDirective } from "./dropdown.directive";
import { HeaderComponent } from "./header/header.component";
import { RecipeDetailComponent } from "./recipes-list/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes-list/recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipes-list/recipe-item/recipe-item.component";
import { RecipeService } from "./recipes-list/recipe.service";
import { RecipesListComponent } from "./recipes-list/recipes-list.component";
import { ShoppingEditComponent } from "./shopping-list/shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { ShoppingService } from "./shopping-list/shopping.service";

const routes: Routes = [
  { path: "", redirectTo: "/recipes", pathMatch: "full" },
  {
    path: "recipes",
    component: RecipesListComponent,
    children: [
      { path: "new", component: RecipeEditComponent },
      { path: ":id", component: RecipeDetailComponent },
      { path: ":id/edit", component: RecipeEditComponent }
    ]
  },
  { path: "shopping", component: ShoppingListComponent } //canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesListComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    RecipeItemComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [RecipeService, ShoppingService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
