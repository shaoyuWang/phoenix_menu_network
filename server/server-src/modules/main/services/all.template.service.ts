import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";
import { RecipeEntity, MaterialEntity } from "../entities";
import { UserDiaryEntity } from "../../admin/entities";

@Injectable()
export class AllTemplateService {
  constructor(
    @InjectRepository(UserDiaryEntity)
    private readonly userDiaryRepository: Repository<UserDiaryEntity>,
    @InjectRepository(MaterialEntity)
    private readonly materialRepository: Repository<MaterialEntity>,
    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,
  ) {}

  //   获取列表
  public async getList(status: any) {
    let data: any;
    let info: any;
    switch (_.toNumber(status)) {
      case 1:
        info = await this.recipeRepository.find({
          relations: ["user"],
        });
        break;
      case 2:
        info = await this.materialRepository.find();
        break;
      case 3:
        info = await this.userDiaryRepository.find({
          relations: ["user"],
        });
        break;
    }
    data = _.assign({}, { info });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }
}
