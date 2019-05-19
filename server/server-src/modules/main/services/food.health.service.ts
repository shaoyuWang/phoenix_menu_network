import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";
import { RecipeEntity, EffectKindEntity } from "../entities";

@Injectable()
export class FoodHealthService {
  constructor(
    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,
    @InjectRepository(EffectKindEntity)
    private readonly effectKindRepository: Repository<EffectKindEntity>,
  ) {}

  //   获取列表
  public async getList() {
    let data: any;
    let recipes = await this.recipeRepository.find({
      relations: ["user", "effects"],
    });
    let effectKinds = await this.effectKindRepository.find({
      relations: ["effects"],
    });
    data = _.assign({}, { recipes }, { effectKinds });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }
}
