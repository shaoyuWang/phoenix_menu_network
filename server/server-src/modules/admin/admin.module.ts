import { Module } from "@nestjs/common";
import {
  AuthorityController,
  UserController,
  RoleController,
  RecipeCommentController,
  UserDiaryCommentController,
} from "./controller";
import {
  LocalStrategyService,
  SerializerService,
  RoleService,
  UserService,
  RecipeCommentService,
  UserDiaryCommentService,
} from "./services";

const controllers = [
  AuthorityController,
  UserController,
  RoleController,
  RecipeCommentController,
  UserDiaryCommentController,
];

const services = [
  LocalStrategyService,
  SerializerService,
  UserService,
  RoleService,
  RecipeCommentService,
  UserDiaryCommentService,
];

@Module({
  controllers: controllers,
  providers: services,
})
export class adminModule {}
