import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";
import { RecipeVideoEntity } from "../entities";

@Injectable()
export class RecipeVideoService {
  constructor(
    @InjectRepository(RecipeVideoEntity)
    private readonly recipeVideoRepository: Repository<RecipeVideoEntity>,
  ) {}

  //   获取列表
  public async getList() {
    let data: any;
    let videos = await this.recipeVideoRepository.find({ relations: ["user"] });
    data = _.assign({}, { videos });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }
}
