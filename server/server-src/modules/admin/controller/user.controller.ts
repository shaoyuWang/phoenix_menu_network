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
import { UserService } from "../services/user.service";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";

@Controller("/api/user")
// @UseGuards(LoginGuard)
export class UserController {
  constructor(private readonly userServices: UserService) {}

  @Get("/getAllUsers")
  // @Roles(1, 2)
  public async getUsers() {
    return this.userServices.getAllUsers();
  }

  @Post("/saveUser")
  // @Roles(1, 2)
  public async saveUser(@Body() data: any) {
    return this.userServices.saveUser(data);
  }

  @Post("/updateUser/:id")
  // @Roles(1)
  public async updateUser(@Param("id") userId: any, @Body() data: any) {
    return this.userServices.updateUser(userId, data);
  }
}
