import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { Roles } from "../../../framework/decorators/role.decorator";
import { LoginGuard } from "../../../framework/guards";
import { UserDiaryService } from "../services/user.diary.service";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";

@Controller("admin/diary")
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
    if (!_.isEmpty(data)) {
      return this.diaryServices.saveDiary(data);
    } else {
      return { code: RESPONSE_CODE.NOTPARAMETER };
    }
  }

  @Put("/updateDiary/:id")
  // @Roles(1)
  public async updateDiary(@Param("id") diaryId: any, @Body() data: any) {
    if (!_.isEmpty(diaryId) && !_.isEmpty(data)) {
      return this.diaryServices.updateDiary(diaryId, data);
    } else {
      return { code: RESPONSE_CODE.NOTPARAMETER };
    }
  }
}
