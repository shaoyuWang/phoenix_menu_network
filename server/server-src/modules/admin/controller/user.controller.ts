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

@Controller("user")
@UseGuards(LoginGuard)
export class UserController {
  constructor(private readonly userServices: UserService) {}

  @Get("/getAllUsers")
  @Roles(1, 2)
  public async getUsers() {
    return this.userServices.getAllUsers();
  }

  @Get("/findUserById/:id")
  @Roles(1, 2)
  public async findUserById(@Param("id") userId: any) {
    if (!_.isEmpty(userId)) {
      return this.userServices.findUserById(userId);
    } else {
      return { code: RESPONSE_CODE.NOTPARAMETER };
    }
  }

  @Post("/saveUser")
  @Roles(1, 2)
  public async saveUser(@Body() data: any) {
    if (!_.isEmpty(data)) {
      return this.userServices.saveUser(data);
    } else {
      return { code: RESPONSE_CODE.NOTPARAMETER };
    }
  }

  @Put("/updateUser/:id")
  @Roles(1)
  public async updateUser(@Param("id") userId: any, @Body() data: any) {
    if (!_.isEmpty(userId) && !_.isEmpty(data)) {
      return this.userServices.updateUser(userId, data);
    } else {
      return { code: RESPONSE_CODE.NOTPARAMETER };
    }
  }

  // @Delete(":id")
  // @Roles(1)
  // public async deleteUser(@Param("id") paramId: any) {
  //   const user = await this.userRepository.delete(paramId);
  //   return { data: user };
  // }
}
