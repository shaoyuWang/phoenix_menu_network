import { Module } from "@nestjs/common";
import {
  RecipeService,
  RecipeCommentService,
  SortService,
  SortKindService,
  MaterialService,
  MaterialKindService,
  TasteService,
  TechnologyService,
  EffectService,
} from "./services";
import {
  IndexController,
  RecipeCookingController,
  ThreeMealsController,
  FoodMenuController,
  GoumetMasterController,
} from "./controller";
import { RecipeVideoController } from "./controller/recipe.video.controller";

const controllers = [
  IndexController,
  RecipeCookingController,
  ThreeMealsController,
  FoodMenuController,
  GoumetMasterController,
  RecipeVideoController,
];

const services = [
  RecipeService,
  RecipeCommentService,
  SortService,
  SortKindService,
  MaterialService,
  MaterialKindService,
  TasteService,
  TechnologyService,
  EffectService,
];

@Module({
  controllers: controllers,
  providers: services,
})
export class mainModule {}
