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
import { UserMenuCommentService } from "../services/user.menu.comment.service";

@Controller("menuComment")
@UseGuards(LoginGuard)
export class UserMenuCommentController {
  constructor(private readonly menuCommentServices: UserMenuCommentService) {}

  @Get("/getAllComments")
  @Roles(1, 2)
  public async getComments() {
    return this.menuCommentServices.getAllComments();
  }

  @Get("/findCommentById/:id")
  @Roles(1, 2)
  public async findCommentById(@Param("id") commentId: any) {
    if (!_.isEmpty(commentId)) {
      return this.menuCommentServices.findCommentById(commentId);
    } else {
      return { code: RESPONSE_CODE.NOTPARAMETER };
    }
  }

  @Post("/saveComment")
  @Roles(2)
  public async saveComment(@Body() data: any) {
    if (!_.isEmpty(data)) {
      return this.menuCommentServices.saveComment(data);
    } else {
      return { code: RESPONSE_CODE.NOTPARAMETER };
    }
  }

  @Put("/praiseComment/:id")
  @Roles(2)
  public async praiseComment(@Param("id") commentId: any) {
    if (!_.isEmpty(commentId)) {
      return this.menuCommentServices.praiseComment(commentId);
    } else {
      return { code: RESPONSE_CODE.NOTPARAMETER };
    }
  }

  @Delete("/deleteComment/:id")
  @Roles(1, 2)
  public async deleteComment(@Param("id") commentId: any) {
    if (!_.isEmpty(commentId)) {
      return this.menuCommentServices.deleteComment(commentId);
    } else {
      return { code: RESPONSE_CODE.NOTPARAMETER };
    }
  }
}
