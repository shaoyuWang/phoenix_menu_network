import { Module } from "@nestjs/common";
import {
  RecipeService,
  RecipeCommentService,
  SortService,
  SortKindService,
  TasteService,
  TechnologyService,
  MaterialService,
  MaterialKindService,
  EffectService,
} from "./services";
import {
  RecipeCommentController,
  TasteController,
  TechnologyController,
  SortController,
  SortKindController,
  MaterialController,
  MaterialKindController,
  EffectController,
} from "./controller";

const controllers = [
  RecipeCommentController,
  TasteController,
  TechnologyController,
  SortController,
  SortKindController,
  MaterialController,
  MaterialKindController,
  EffectController,
];

const services = [
  RecipeService,
  RecipeCommentService,
  SortService,
  SortKindService,
  TasteService,
  TechnologyService,
  EffectService,
  MaterialService,
  MaterialKindService,
];

@Module({
  controllers: controllers,
  providers: services,
})
export class mainModule {}
