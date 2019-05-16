import { Controller, Get, UseGuards } from "@nestjs/common";
import { Roles } from "../../../framework/decorators/role.decorator";
import { LoginGuard } from "../../../framework/guards";
import { RESPONSE_CODE } from "../../../framework/enums";
import _ from "lodash";
import { RecipeService, MaterialService } from "../services";

@Controller("/main/index")
@UseGuards(LoginGuard)
export class IndexController {
  constructor(
    private readonly recipeService: RecipeService,
    private readonly materialService: MaterialService,
  ) {}

  @Get("/getList")
  @Roles(2)
  public async getList() {
    let data: any;
    data.recipes = await this.recipeService.getAllRecipes();
    data.materials = await this.materialService.getAllMaterials();
    return { data, code: RESPONSE_CODE.SUCCESS };
  }
}
