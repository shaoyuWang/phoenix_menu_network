import { Module } from "@nestjs/common";
import {
  AuthorityController,
  UserController,
  RoleController,
} from "./controller";
import {
  LocalStrategyService,
  SerializerService,
  RoleService,
  UserDiaryService,
  UserMenuService,
  RecipeService,
} from "./services";
import { UserService } from "./services/user.service";
import { UserDiaryController } from "./controller/user.diary.controller";
import { UserDiaryCommentController } from "./controller/user.diary.comment.controller";
import { UserMenuController } from "./controller/user.menu.controller";
import { UserMenuCommentController } from "./controller/user.menu.comment.controller";
import { UserDiaryCommentService } from "./services/user.diary.comment.service";
import { UserMenuCommentService } from "./services/user.menu.comment.service";
import { RecipeController } from "./controller/recipe.controller";

const controllers = [
  AuthorityController,
  UserController,
  RoleController,
  UserDiaryController,
  UserDiaryCommentController,
  UserMenuController,
  UserMenuCommentController,
  RecipeController,
];

const services = [
  LocalStrategyService,
  SerializerService,
  UserService,
  RoleService,
  UserDiaryService,
  UserDiaryCommentService,
  UserMenuService,
  UserMenuCommentService,
  RecipeService,
];

@Module({
  controllers: controllers,
  providers: services,
})
export class AdminModule {}
