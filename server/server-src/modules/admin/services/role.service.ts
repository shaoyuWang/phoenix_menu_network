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
    let data: any;
    const roles = await this.roleRepository.find();
    data = _.assign({}, { roles });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   根据ID查找角色
  public async findRoleById(roleId: any) {
    let data: any;
    const role = await this.roleRepository.findOne(roleId);
    data = _.assign({}, { role });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   添加角色
  public async saveRole(info: any) {
    let data: any;
    const role = await this.roleRepository.save(info);
    data = _.assign({}, { role });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   修改角色
  public async updateRole(roleId: any, info: any) {
    let data: any;
    let role = await this.roleRepository.findOne(roleId);
    if (!_.isEmpty(role)) {
      role = await this.roleRepository.save(
        this.roleRepository.merge(role as any, info),
      );
      data = _.assign({}, { role });
      if (!_.isEmpty(data)) {
        return { data, code: RESPONSE_CODE.SUCCESS };
      } else {
        return { code: RESPONSE_CODE.NOTVALUE };
      }
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  // 删除角色
  public async deleteRole(roleId: any) {
    let data: any;
    let role = await this.roleRepository.delete(roleId);
    data = _.assign({}, { role });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }
}
