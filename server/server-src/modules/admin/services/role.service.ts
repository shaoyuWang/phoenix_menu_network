import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleEntity } from "../entities";
import { Repository } from "typeorm";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  //   获取全部角色信息
  public async getAllRoles() {
    const roles = await this.roleRepository.find();
    if (!_.isEmpty(roles)) {
      return { data: roles, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   根据ID查找角色
  public async findRoleById(roleId: any) {
    const role = await this.roleRepository.findOne(roleId);
    if (!_.isEmpty(role)) {
      return { data: role, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   添加角色
  public async saveRole(data: any) {
    const role = await this.roleRepository.save(data);
    if (!_.isEmpty(role)) {
      let roles = await this.roleRepository.find();
      return { data: roles, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   修改角色
  public async updateRole(roleId: any, data: any) {
    let role = await this.roleRepository.findOne(roleId);
    if (!_.isEmpty(role)) {
      role = await this.roleRepository.save(
        this.roleRepository.merge(role as any, data),
      );
      let roles = await this.roleRepository.find();
      return { data: roles, code: RESPONSE_CODE.SUCCESS };
    }
  }

  // 删除角色
  public async deleteRole(roleId: any) {
    let role = await this.roleRepository.delete(roleId);
    if (!_.isEmpty(role)) {
      let roles = await this.roleRepository.find();
      return { data: roles, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }
}
