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
  UserCenterController,
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
  UserCenterService,
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
  UserCenterController,
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
  UserCenterService,
];

@Module({
  controllers: controllers,
  providers: services,
})
export class mainModule {}
