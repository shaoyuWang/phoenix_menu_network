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

@Controller("menu")
@UseGuards(LoginGuard)
export class UserMenuController {
  constructor(private readonly menuServices: UserMenuService) {}

  @Get("/getAllMenus")
  @Roles(1, 2)
  public async getMenus() {
    return this.menuServices.getAllMenus();
  }

  //   @Get("/findMenuById/:id")
  //   @Roles(1, 2)
  //   public async findMenuById(@Param("id") menuId: any) {
  //     if (!_.isEmpty(menuId)) {
  //       return this.menuServices.findMenuById(menuId);
  //     } else {
  //       return { code: 500 };
  //     }
  //   }

  @Post("/saveMenu")
  @Roles(1, 2)
  public async saveMenu(@Body() data: any) {
    if (!_.isEmpty(data)) {
      return this.menuServices.saveMenu(data);
    } else {
      return { code: RESPONSE_CODE.NOTPARAMETER };
    }
  }

  @Put("/updateMenu/:id")
  @Roles(1)
  public async updateMenu(@Param("id") menuId: any, @Body() data: any) {
    if (!_.isEmpty(menuId) && !_.isEmpty(data)) {
      return this.menuServices.updateMenu(menuId, data);
    } else {
      return { code: RESPONSE_CODE.NOTPARAMETER };
    }
  }
}
