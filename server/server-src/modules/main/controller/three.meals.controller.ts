import { Controller, Get, UseGuards } from "@nestjs/common";
import { Roles } from "../../../framework/decorators/role.decorator";
import { LoginGuard } from "../../../framework/guards";
import { RESPONSE_CODE } from "../../../framework/enums";
import _ from "lodash";
import { RecipeService, SortKindService } from "../services";

@Controller("/main/foodMeals")
@UseGuards(LoginGuard)
export class ThreeMealsController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get("/getList")
  @Roles(2)
  public async getList() {
    let data: any;
    data.recipes = await this.recipeService.getAllRecipes();
    return { data, code: RESPONSE_CODE.SUCCESS };
  }
}