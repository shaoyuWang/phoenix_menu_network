import { Module } from "@nestjs/common";
import {
  AuthorityController,
  UserController,
  RoleController,
  RecipeCommentController,
  UserDiaryCommentController,
  UserDiaryController,
  TechnologyController,
  EffectController,
} from "./controller";
import {
  LocalStrategyService,
  SerializerService,
  RoleService,
  UserService,
  RecipeCommentService,
  UserDiaryCommentService,
  UserDiaryService,
  TechnologyService,
  EffectService,
} from "./services";

const controllers = [
  AuthorityController,
  UserController,
  RoleController,
  RecipeCommentController,
  UserDiaryController,
  UserDiaryCommentController,
  TechnologyController,
  EffectController,
];

const services = [
  LocalStrategyService,
  SerializerService,
  UserService,
  RoleService,
  RecipeCommentService,
  UserDiaryService,
  UserDiaryCommentService,
  TechnologyService,
  EffectService,
];

@Module({
  controllers: controllers,
  providers: services,
})
export class adminModule {}
