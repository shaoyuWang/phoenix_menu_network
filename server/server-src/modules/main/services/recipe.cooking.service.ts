import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";
import { RecipeEntity, SortKindEntity } from "../entities";

@Injectable()
export class RecipeCookingService {
  constructor(
    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,
    @InjectRepository(SortKindEntity)
    private readonly sortKindRepository: Repository<SortKindEntity>,
  ) {}

  //   获取列表
  public async getList() {
    let data: any;
    let recipes = await this.recipeRepository.find({
      relations: ["user", "sort", "effects"],
    });
    let sortKinds = await this.sortKindRepository.find({
      relations: ["sorts"],
    });
    data = _.assign({}, { recipes }, { sortKinds });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }
}
