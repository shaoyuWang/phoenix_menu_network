import { Controller, Get, UseGuards, Param, Post, Body } from "@nestjs/common";
import { Roles } from "../../../framework/decorators/role.decorator";
import { LoginGuard } from "../../../framework/guards";
import _ from "lodash";
import { UserCenterService } from "../services";

@Controller("/main/userCenter")
// @UseGuards(LoginGuard)
export class UserCenterController {
  constructor(private readonly userCenterService: UserCenterService) {}

  @Get("/getRecipeBaseInfo")
  // @Roles(2)
  public async getRecipeBaseInfo() {
    return await this.userCenterService.getRecipeBaseInfo();
  }

  @Post("/saveRecipe")
  // @Roles(2)
  public async saveRecipe(@Body() data: any) {
    return await this.userCenterService.saveRecipe(data);
  }

  @Get("/getUser/:id")
  // @Roles(2)
  public async getUser(@Param("id") userId: any) {
    return await this.userCenterService.getUser(userId);
  }

  @Get("/findUserById/:id")
  // @Roles(1, 2)
  public async findUserById(@Param("id") userId: any) {
    return this.userCenterService.findUserById(userId);
  }

  @Post("/updateUser/:id")
  // @Roles(1)
  public async updateUser(@Param("id") userId: any, @Body() data: any) {
    return this.userCenterService.updateUser(userId, data);
  }

  @Get("/getRecipe/:id")
  // @Roles(2)
  public async getRecipe(@Param("id") userId: any) {
    return await this.userCenterService.getRecipe(userId);
  }

  @Get("/getCollection/:id")
  // @Roles(2)
  public async getCollection(@Param("id") userId: any) {
    return await this.userCenterService.getCollection(userId);
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
