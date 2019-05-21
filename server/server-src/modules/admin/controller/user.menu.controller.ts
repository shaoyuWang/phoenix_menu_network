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
import { UserMenuService } from "../services/user.menu.service";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";

@Controller("api/menu")
// @UseGuards(LoginGuard)
export class UserMenuController {
  constructor(private readonly menuServices: UserMenuService) {}

  @Get("/getAllMenus")
  // @Roles(1, 2)
  public async getMenus() {
    return this.menuServices.getAllMenus();
  }

  @Post("/saveMenu")
  // @Roles(1, 2)
  public async saveMenu(@Body() data: any) {
    if (!_.isEmpty(data)) {
      return this.menuServices.saveMenu(data);
    } else {
      return { code: RESPONSE_CODE.NOTPARAMETER };
    }
  }
}
