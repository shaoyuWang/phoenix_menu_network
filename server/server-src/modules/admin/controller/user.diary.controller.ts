import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Roles } from "../../../framework/decorators/role.decorator";
import { LoginGuard } from "../../../framework/guards";
import { UserDiaryService } from "../services/user.diary.service";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";

@Controller("api/diary")
// @UseGuards(LoginGuard)
export class UserDiaryController {
  constructor(private readonly diaryServices: UserDiaryService) {}

  @Get("/getAllDiarys")
  // @Roles(1, 2)
  public async getDiarys() {
    return this.diaryServices.getAllDiarys();
  }

  @Post("/saveDiary")
  // @Roles(1, 2)
  public async saveDiary(@Body() data: any) {
    return this.diaryServices.saveDiary(data);
  }

  @Post("/updateDiary/:id")
  // @Roles(1)
  public async updateDiary(@Param("id") diaryId: any, @Body() data: any) {
    return this.diaryServices.updateDiary(diaryId, data);
  }

  @Post("/deleteDiary/:id")
  // @Roles(1)
  public async deleteDiary(@Param("id") diaryId: any) {
    return this.diaryServices.deleteDiary(diaryId);
  }
}
