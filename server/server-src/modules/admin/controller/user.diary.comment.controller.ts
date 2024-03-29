import { Controller, Get, Param, UseGuards, Post } from "@nestjs/common";
import { Roles } from "../../../framework/decorators/role.decorator";
import { LoginGuard } from "../../../framework/guards";
import _ from "lodash";
import { UserDiaryCommentService } from "../services";

@Controller("api/diaryComment")
// @UseGuards(LoginGuard)
export class UserDiaryCommentController {
  constructor(private readonly commentServices: UserDiaryCommentService) {}

  @Get("/getAllComments")
  // @Roles(1, 2)
  public async getComments() {
    return this.commentServices.getAllComments();
  }

  @Post("/deleteComment/:id")
  // @Roles(1, 2)
  public async deleteComment(@Param("id") commentId: any) {
    return this.commentServices.deleteComment(commentId);
  }
}
