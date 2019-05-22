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
  TasteController,
  SortKindController,
  MaterialKindController,
  MaterialController,
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
  TasteService,
  SortKindService,
  MaterialKindService,
  SortService,
  MaterialService,
} from "./services";
import { SortController } from "./controller/sort.controller";

const controllers = [
  AuthorityController,
  UserController,
  RoleController,
  RecipeCommentController,
  UserDiaryController,
  UserDiaryCommentController,
  TechnologyController,
  EffectController,
  TasteController,
  SortController,
  SortKindController,
  MaterialController,
  MaterialKindController,
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
  TasteService,
  SortService,
  SortKindService,
  MaterialService,
  MaterialKindService,
];

@Module({
  controllers: controllers,
  providers: services,
})
export class adminModule {}
