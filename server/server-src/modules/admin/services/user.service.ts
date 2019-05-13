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
    const users = await this.userRepository.find({ relations: ["roles"] });
    if (!_.isEmpty(users)) {
      return { data: users, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   根据ID查找用户
  public async findUserById(userId: any) {
    const user = await this.userRepository.findOne(userId);
    if (!_.isEmpty(user)) {
      return { data: user, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   添加用户
  public async saveUser(data: any) {
    const user = await this.userRepository.save(data);
    if (!_.isEmpty(user)) {
      const users = await this.userRepository.find({ relations: ["roles"] });
      return { data: users, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   修改用户
  public async updateUser(userId: any, data: any) {
    let user = await this.userRepository.findOne(userId);
    if (!_.isEmpty(user)) {
      user = await this.userRepository.save(
        this.userRepository.merge(user as any, data),
      );
      const users = await this.userRepository.find({ relations: ["roles"] });
      return { data: users, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }
}
