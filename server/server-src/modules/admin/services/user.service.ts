import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities";
import { Repository } from "typeorm";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  //   获取全部用户信息
  public async getAllUsers() {
    let data: any;
    const users = await this.userRepository.find({ relations: ["roles"] });
    _.orderBy(users, "id", "asc");
    data = _.assign({}, { users });
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

  //   添加用户
  public async saveUser(info: any) {
    let data: any;
    const user = await this.userRepository.save(info);
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
}
