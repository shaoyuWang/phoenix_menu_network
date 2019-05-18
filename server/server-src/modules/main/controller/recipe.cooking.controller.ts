import { Controller, Get, UseGuards } from "@nestjs/common";
import { Roles } from "../../../framework/decorators/role.decorator";
import { LoginGuard } from "../../../framework/guards";
import { RESPONSE_CODE } from "../../../framework/enums";
import _ from "lodash";
import { RecipeCookingService } from "../services";

@Controller("/main/recipeCooking")
@UseGuards(LoginGuard)
export class RecipeCookingController {
  constructor(private readonly recipeCookingService: RecipeCookingService) {}

  @Get("/getList")
  @Roles(2)
  public async getList() {
    let data = await this.recipeCookingService.getList();
    return { data, code: RESPONSE_CODE.SUCCESS };
  }
}
