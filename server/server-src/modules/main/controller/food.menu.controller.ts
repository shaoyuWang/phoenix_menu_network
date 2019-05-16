import { Controller, Get, UseGuards } from "@nestjs/common";
import { Roles } from "../../../framework/decorators/role.decorator";
import { LoginGuard } from "../../../framework/guards";
import { RESPONSE_CODE } from "../../../framework/enums";
import _ from "lodash";
import { UserMenuService } from "../../admin/services";

@Controller("/main/foodMenu")
@UseGuards(LoginGuard)
export class FoodMenuController {
  constructor(private readonly userMenuService: UserMenuService) {}

  @Get("/getList")
  @Roles(2)
  public async getList() {
    let data: any;
    data.menus = await this.userMenuService.getAllMenus();
    return { data, code: RESPONSE_CODE.SUCCESS };
  }
}
