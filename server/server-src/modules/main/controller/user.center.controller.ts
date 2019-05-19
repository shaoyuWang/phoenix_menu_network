import { Controller, Get, UseGuards, Param } from "@nestjs/common";
import { Roles } from "../../../framework/decorators/role.decorator";
import { LoginGuard } from "../../../framework/guards";
import _ from "lodash";
import { UserCenterService } from "../services";

@Controller("/main/userCenter")
// @UseGuards(LoginGuard)
export class UserCenterController {
  constructor(private readonly userCenterService: UserCenterService) {}

  @Get("/getUser/:id")
  // @Roles(2)
  public async getUser(@Param("id") userId: any) {
    return await this.userCenterService.getUser(userId);
  }

  @Get("/getRecipe/:id")
  // @Roles(2)
  public async getRecipe(@Param("id") userId: any) {
    return await this.userCenterService.getRecipe(userId);
  }

  @Get("/getMenu/:id")
  // @Roles(2)
  public async getMenu(@Param("id") userId: any) {
    return await this.userCenterService.getMenu(userId);
  }

  @Get("/getDiary/:id")
  // @Roles(2)
  public async getDiary(@Param("id") userId: any) {
    return await this.userCenterService.getDiary(userId);
  }
}
