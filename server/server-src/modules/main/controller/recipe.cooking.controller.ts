import { Controller, Get, UseGuards } from "@nestjs/common";
import { Roles } from "../../../framework/decorators/role.decorator";
import { LoginGuard } from "../../../framework/guards";
import { RESPONSE_CODE } from "../../../framework/enums";
import _ from "lodash";
import { RecipeService, SortKindService } from "../services";

@Controller("/main/recipeCooking")
@UseGuards(LoginGuard)
export class RecipeCookingController {
  constructor(
    private readonly recipeService: RecipeService,
    private readonly sortKindService: SortKindService,
  ) {}

  @Get("/getList")
  @Roles(2)
  public async getList() {
    let data: any;
    data.recipes = await this.recipeService.getAllRecipes();
    data.kinds = await this.sortKindService.getAllKinds();
    return { data, code: RESPONSE_CODE.SUCCESS };
  }
}
