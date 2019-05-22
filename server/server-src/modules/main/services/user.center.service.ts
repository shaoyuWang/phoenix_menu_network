import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";
import { UserEntity, UserMenuEntity } from "../../admin/entities";

@Injectable()
export class UserCenterService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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

  //   根据ID查找用户
  public async findUserById(userId: any) {
    let data: any;
    const user = await this.userRepository.findOne(userId);
    data = _.assign({}, { user });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   修改用户
  public async updateUser(userId: any, info: any) {
    let data: any;
    let user = await this.userRepository.findOne(userId);
    if (!_.isEmpty(user)) {
      user = await this.userRepository.save(
        this.userRepository.merge(user as any, info),
      );
      data = _.assign({}, { user });
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   获取菜谱信息
  public async getRecipe(userId: any) {
    let data: any;
    let user = await this.userRepository.findOne(userId, {
      relations: ["recipes"],
    });
    data = _.assign({}, { recipes: user!.recipes });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   获取收藏信息
  public async getCollection(userId: any) {
    let data: any;
    let user = await this.userRepository.findOne(userId, {
      relations: ["collections"],
    });
    data = _.assign({}, { collections: user!.collections });
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
    data = _.assign({}, { diarys: user!.diarys });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }
}
