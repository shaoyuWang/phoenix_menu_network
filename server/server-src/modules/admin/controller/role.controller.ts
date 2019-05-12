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
import { RoleService } from "../services";
import { RESPONSE_CODE } from "../../../framework/enums";
import _ from "lodash";
@Controller("roles")
@UseGuards(LoginGuard)
export class RoleController {
  constructor(private readonly roleServices: RoleService) {}

  @Get("/getAllRoles")
  @Roles(1)
  public async getRoles() {
    return this.roleServices.getAllRoles();
  }

  @Post("/saveRole")
  @Roles(1)
  public async createRole(@Body() data: any) {
    if (!_.isEmpty(data)) {
      return this.roleServices.saveRole(data);
    } else {
      return { code: RESPONSE_CODE.NOTPARAMETER };
    }
  }

  @Put("/updateRole/:id")
  @Roles(1)
  public async updateRole(@Param("id") roleId: any, @Body() data: any) {
    if (!_.isEmpty(roleId) && !_.isEmpty(data)) {
      return this.roleServices.updateRole(roleId, data);
    } else {
      return { code: RESPONSE_CODE.NOTPARAMETER };
    }
  }

  @Delete("/deleteRole/:id")
  @Roles(1)
  public async deleteRole(@Param("id") roleId: any) {
    if (!_.isEmpty(roleId)) {
      return this.roleServices.deleteRole(roleId);
    } else {
      return { code: RESPONSE_CODE.NOTPARAMETER };
    }
  }
}
