import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";
import { RecipeEntity, EffectEntity } from "../entities";

@Injectable()
export class FoodHealthService {
  constructor(
    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,
    @InjectRepository(EffectEntity)
    private readonly effectRepository: Repository<EffectEntity>,
  ) {}

  //   获取列表
  public async getList() {
    let data: any;
    let recipes = await this.recipeRepository.find({
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
    let effects = await this.effectRepository.find();
    data = _.assign({}, { recipes }, { effects });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }
}
