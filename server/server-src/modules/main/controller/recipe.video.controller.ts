import { Controller, Get, UseGuards } from "@nestjs/common";
import { Roles } from "../../../framework/decorators/role.decorator";
import { LoginGuard } from "../../../framework/guards";
import { RESPONSE_CODE } from "../../../framework/enums";
import _ from "lodash";
import { RecipeVideoService } from "../services";

@Controller("/main/recipeVideo")
@UseGuards(LoginGuard)
export class RecipeVideoController {
  constructor(private readonly recipeVideoService: RecipeVideoService) {}

  @Get("/getList")
  @Roles(2)
  public async getList() {
    let data = await this.recipeVideoService.getList();
    return { data, code: RESPONSE_CODE.SUCCESS };
  }
}
