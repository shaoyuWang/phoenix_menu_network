import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { Roles } from "../../../framework/decorators/role.decorator";
import { LoginGuard } from "../../../framework/guards";
import _ from "lodash";
import { RecipeService } from "../services";

@Controller("api/recipe")
// @UseGuards(LoginGuard)
export class RecipeController {
  constructor(private readonly recipeServices: RecipeService) {}

  @Get("/getAllRecipes")
  // @Roles(1, 2)
  public async getrecipes() {
    return this.recipeServices.getAllRecipes();
  }
}
