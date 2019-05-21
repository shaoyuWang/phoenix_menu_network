import { Controller, Get, Param, UseGuards, Post } from "@nestjs/common";
import { Roles } from "../../../framework/decorators/role.decorator";
import { LoginGuard } from "../../../framework/guards";
import _ from "lodash";
import { RecipeCommentService } from "../services";

@Controller("api/recipeComment")
// @UseGuards(LoginGuard)
export class RecipeCommentController {
  constructor(private readonly commentServices: RecipeCommentService) {}

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
