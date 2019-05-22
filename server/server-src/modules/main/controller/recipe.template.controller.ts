import { Controller, Get, UseGuards, Param, Body, Post } from "@nestjs/common";
import { Roles } from "../../../framework/decorators/role.decorator";
import { LoginGuard } from "../../../framework/guards";
import { RESPONSE_CODE } from "../../../framework/enums";
import _ from "lodash";
import { RecipeTemplateService } from "../services";

@Controller("/main/recipeTemplate")
// @UseGuards(LoginGuard)
export class RecipeTemplateController {
  constructor(private readonly recipeTemplateService: RecipeTemplateService) {}

  @Get("/findRecipeById/:id")
  // @Roles(2)
  public async findRecipeById(@Param("id") recipeId: any) {
    return await this.recipeTemplateService.findRecipeById(recipeId);
  }

  @Get("/findUserById/:id")
  // @Roles(2)
  public async findUserById(@Param("id") userId: any) {
    return await this.recipeTemplateService.findUserById(userId);
  }

  @Post("/publishComment")
  // @Roles(2)
  public async publishComment(@Body() data: any) {
    return await this.recipeTemplateService.saveComment(data);
  }

  @Post("/collectionRecipe")
  public async collectionRecipe(@Body() data: any) {
    return await this.recipeTemplateService.collectionRecipe(data);
  }

  @Post("/recipeAddMenu")
  public async recipeAddMenu(@Body() data: any) {
    return await this.recipeTemplateService.recipeAddMenu(data);
  }

  @Post("/createMenu")
  public async createMenu(@Body() data: any) {
    return await this.recipeTemplateService.createMenu(data);
  }

  @Post("/praiseComment")
  // @Roles(2)
  public async praiseComment(@Body() data: any) {
    const { commentId } = data;
    return await this.recipeTemplateService.praiseComment(commentId);
  }
}
