import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RecipeEntity } from "../entities";
import { Repository } from "typeorm";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,
  ) {}

  //   获取全部菜谱信息
  public async getAllRecipes() {
    const recipes = await this.recipeRepository.find({
      relations: [
        "taste",
        "sort",
        "technology",
        "step",
        "majorMaterial",
        "auxiliaryMaterial",
        "effect",
      ],
    });
    if (!_.isEmpty(recipes)) {
      return { data: recipes, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   根据ID查找菜谱
  public async findRecipeById(recipeId: any) {
    const recipe = await this.recipeRepository.findOne(recipeId, {
      relations: [
        "taste",
        "sort",
        "technology",
        "step",
        "majorMaterial",
        "auxiliaryMaterial",
        "effect",
      ],
    });
    if (!_.isEmpty(recipe)) {
      return { data: recipe, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   添加菜谱
  public async saveRecipe(data: any) {
    const recipe = await this.recipeRepository.save(data);
    if (!_.isEmpty(recipe)) {
      return { data: recipe, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   修改菜谱
  public async updateRecipe(recipeId: any, data: any) {
    let recipe = await this.recipeRepository.findOne(recipeId);
    if (!_.isEmpty(recipe)) {
      recipe = await this.recipeRepository.save(
        this.recipeRepository.merge(recipe as any, data),
      );
      return { data: recipe, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }
}
