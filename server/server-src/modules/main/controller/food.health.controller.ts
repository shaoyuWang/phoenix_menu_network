import { Controller, Get, UseGuards } from "@nestjs/common";
import { Roles } from "../../../framework/decorators/role.decorator";
import { LoginGuard } from "../../../framework/guards";
import _ from "lodash";
import { FoodHealthService } from "../services";

@Controller("/main/foodHealth")
// @UseGuards(LoginGuard)
export class FoodHealthController {
  constructor(private readonly foodHealthService: FoodHealthService) {}

  @Get("/getList")
  // @Roles(2)
  public async getList() {
    return await this.foodHealthService.getList();
  }
}
