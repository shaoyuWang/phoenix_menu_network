import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Delete,
} from "@nestjs/common";
import { Roles } from "../../../framework/decorators/role.decorator";
import { LoginGuard } from "../../../framework/guards";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";
import { UserDiaryCommentService } from "../services/user.diary.comment.service";

@Controller("api/diaryComment")
// @UseGuards(LoginGuard)
export class UserDiaryCommentController {
  constructor(private readonly diaryCommentServices: UserDiaryCommentService) {}

  @Get("/getAllComments")
  // @Roles(1, 2)
  public async getComments() {
    return this.diaryCommentServices.getAllComments();
  }

  @Get("/findCommentById/:id")
  // @Roles(1, 2)
  public async findCommentById(@Param("id") commentId: any) {
    if (!_.isEmpty(commentId)) {
      return this.diaryCommentServices.findCommentById(commentId);
    } else {
      return { code: RESPONSE_CODE.NOTPARAMETER };
    }
  }

  @Post("/saveComment")
  // @Roles(2)
  public async saveComment(@Body() data: any) {
    if (!_.isEmpty(data)) {
      return this.diaryCommentServices.saveComment(data);
    } else {
      return { code: RESPONSE_CODE.NOTPARAMETER };
    }
  }

  @Put("/praiseComment/:id")
  // @Roles(2)
  public async praiseComment(@Param("id") commentId: any) {
    if (!_.isEmpty(commentId)) {
      return this.diaryCommentServices.praiseComment(commentId);
    } else {
      return { code: RESPONSE_CODE.NOTPARAMETER };
    }
  }

  @Delete("/deleteComment/:id")
  // @Roles(1, 2)
  public async deleteComment(@Param("id") commentId: any) {
    if (!_.isEmpty(commentId)) {
      return this.diaryCommentServices.deleteComment(commentId);
    } else {
      return { code: RESPONSE_CODE.NOTPARAMETER };
    }
  }
}
