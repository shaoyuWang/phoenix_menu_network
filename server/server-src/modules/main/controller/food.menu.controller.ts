import { Controller, Get, UseGuards } from "@nestjs/common";
import { Roles } from "../../../framework/decorators/role.decorator";
import { LoginGuard } from "../../../framework/guards";
import _ from "lodash";
import { FoodMenuService } from "../services";

@Controller("/main/foodMenu")
// @UseGuards(LoginGuard)
export class FoodMenuController {
  constructor(private readonly foodMenuService: FoodMenuService) {}

  @Get("/getList")
  // @Roles(2)
  public async getList() {
    return await this.foodMenuService.getList();
  }
}
