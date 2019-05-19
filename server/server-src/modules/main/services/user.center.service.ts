import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";
import { UserEntity, UserMenuEntity } from "../../admin/entities";
import { RecipeEntity } from "../entities";

@Injectable()
export class UserCenterService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,
    @InjectRepository(UserMenuEntity)
    private readonly userMenuRepository: Repository<UserMenuEntity>,
  ) {}

  //   获取用户信息
  public async getUser(userId: any) {
    let data: any;
    let user = await this.userRepository.findOne(userId);
    data = _.assign({}, { user });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   获取菜谱信息
  public async getRecipe(userId: any) {
    let data: any;
    let user = await this.userRepository.findOne(userId);
    let recipes = await this.recipeRepository.find({ where: { user } });
    data = _.assign({}, { recipes });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   获取菜单信息
  public async getMenu(userId: any) {
    let data: any;
    let user = await this.userRepository.findOne(userId);
    let menus = await this.userMenuRepository.find({
      relations: ["recipes"],
      where: { user },
    });
    data = _.assign({}, { menus });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   获取日记信息
  public async getDiary(userId: any) {
    let data: any;
    let user = await this.userRepository.findOne(userId, {
      relations: ["diarys"],
    });
    let diarys = user!.diarys;
    data = _.assign({}, { diarys });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }
}
