import { Controller, Get, UseGuards } from "@nestjs/common";
import { Roles } from "../../../framework/decorators/role.decorator";
import { LoginGuard } from "../../../framework/guards";
import _ from "lodash";
import { ThreeMealsService } from "../services";

@Controller("/main/threeMeals")
// @UseGuards(LoginGuard)
export class ThreeMealsController {
  constructor(private readonly threeMealsService: ThreeMealsService) {}

  @Get("/getList")
  // @Roles(2)
  public async getList() {
    return await this.threeMealsService.getList();
  }
}
