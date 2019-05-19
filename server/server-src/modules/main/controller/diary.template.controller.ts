import { Controller, Get, UseGuards, Param, Body, Post } from "@nestjs/common";
import { Roles } from "../../../framework/decorators/role.decorator";
import { LoginGuard } from "../../../framework/guards";
import { RESPONSE_CODE } from "../../../framework/enums";
import _ from "lodash";
import { DiaryTemplateService } from "../services";

@Controller("/main/diaryTemplate")
// @UseGuards(LoginGuard)
export class DiaryTemplateController {
  constructor(private readonly diaryTemplateService: DiaryTemplateService) {}

  @Get("/findDiaryById/:id")
  // @Roles(2)
  public async findRecipeById(@Param("id") commentId: any) {
    return await this.diaryTemplateService.findDiaryById(commentId);
  }

  @Get("/findUserById/:id")
  // @Roles(2)
  public async findUserById(@Param("id") userId: any) {
    return await this.diaryTemplateService.findUserById(userId);
  }

  @Post("/publishComment")
  // @Roles(2)
  public async publishComment(@Body() data: any) {
    return await this.diaryTemplateService.saveComment(data);
  }

  @Post("/praiseComment")
  // @Roles(2)
  public async praiseComment(@Body() data: any) {
    const { commentId } = data;
    return await this.diaryTemplateService.praiseComment(commentId);
  }
}
