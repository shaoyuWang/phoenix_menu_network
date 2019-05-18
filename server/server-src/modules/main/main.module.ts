import { Module } from "@nestjs/common";
import {
  IndexController,
  FoodMenuController,
  GoumetMasterController,
  RecipeCookingController,
  RecipeVideoController,
  ThreeMealsController,
  FoodHealthController,
} from "./controller";
import {
  IndexService,
  FoodMenuService,
  GoumetMasterService,
  RecipeCookingService,
  RecipeVideoService,
  ThreeMealsService,
  FoodHealthService,
} from "./services";

const controllers = [
  IndexController,
  FoodMenuController,
  FoodHealthController,
  GoumetMasterController,
  RecipeCookingController,
  RecipeVideoController,
  ThreeMealsController,
];

const services = [
  IndexService,
  FoodMenuService,
  FoodHealthService,
  GoumetMasterService,
  RecipeCookingService,
  RecipeVideoService,
  ThreeMealsService,
];

@Module({
  controllers: controllers,
  providers: services,
})
export class mainModule {}
