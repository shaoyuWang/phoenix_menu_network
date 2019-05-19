import { Module } from "@nestjs/common";
import {
  IndexController,
  FoodMenuController,
  GourmetMasterController,
  RecipeCookingController,
  RecipeVideoController,
  ThreeMealsController,
  FoodHealthController,
  RecipeTemplateController,
  DiaryTemplateController,
  AllTemplateController,
} from "./controller";
import {
  IndexService,
  FoodMenuService,
  GourmetMasterService,
  RecipeCookingService,
  RecipeVideoService,
  ThreeMealsService,
  FoodHealthService,
  RecipeTemplateService,
  DiaryTemplateService,
  AllTemplateService,
} from "./services";

const controllers = [
  IndexController,
  FoodMenuController,
  FoodHealthController,
  GourmetMasterController,
  RecipeCookingController,
  RecipeVideoController,
  ThreeMealsController,
  RecipeTemplateController,
  DiaryTemplateController,
  AllTemplateController,
];

const services = [
  IndexService,
  FoodMenuService,
  FoodHealthService,
  GourmetMasterService,
  RecipeCookingService,
  RecipeVideoService,
  ThreeMealsService,
  RecipeTemplateService,
  DiaryTemplateService,
  AllTemplateService,
];

@Module({
  controllers: controllers,
  providers: services,
})
export class mainModule {}
