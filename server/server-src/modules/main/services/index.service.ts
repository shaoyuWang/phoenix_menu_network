import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";
import { RecipeEntity, MaterialKindEntity } from "../entities";

@Injectable()
export class IndexService {
  constructor(
    @InjectRepository(MaterialKindEntity)
    private readonly materialKindRepository: Repository<MaterialKindEntity>,
    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,
  ) {}

  //   获取列表
  public async getList() {
    let data: any;
    let recipes = await this.recipeRepository.find({
      relations: ["user"],
    });
    let kinds = await this.materialKindRepository.find({
      relations: ["materials"],
    });
    data = _.assign({}, { recipes }, { kinds });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }
}
