import { Module } from "@nestjs/common";
import {
  IndexController,
  FoodMenuController,
  GoumetMasterController,
  RecipeCookingController,
  RecipeVideoController,
  ThreeMealsController,
} from "./controller";
import {
  IndexService,
  FoodMenuService,
  GoumetMasterService,
  RecipeCookingService,
  RecipeVideoService,
  ThreeMealsService,
} from "./services";

const controllers = [
  IndexController,
  FoodMenuController,
  GoumetMasterController,
  RecipeCookingController,
  RecipeVideoController,
  ThreeMealsController,
];

const services = [
  IndexService,
  FoodMenuService,
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
