import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";
import { UserMenuEntity } from "../../admin/entities";
import { RecipeEntity } from "../entities";

@Injectable()
export class FoodMenuService {
  constructor(
    @InjectRepository(UserMenuEntity)
    private readonly userMenuRepository: Repository<UserMenuEntity>,
    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,
  ) {}

  //   获取列表
  public async getList() {
    let data: any;
    let recipes = await this.recipeRepository.find();
    let menus = await this.userMenuRepository.find({
      relations: ["user", "recipes"],
    });
    data = _.assign({}, { recipes }, { menus });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }
}
