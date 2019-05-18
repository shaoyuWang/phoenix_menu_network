import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RESPONSE_CODE } from "../../../framework/enums";
import _ from "lodash";
import { RecipeEntity } from "../../main/entities";

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
        "user",
        "sort",
        "technology",
        "taste",
        "majorMaterials",
        "auxiliaryMaterials",
        "comments",
        // "steps",
        "effects",
      ],
    });
    if (!_.isEmpty(recipes)) {
      return { data: recipes, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }
}
