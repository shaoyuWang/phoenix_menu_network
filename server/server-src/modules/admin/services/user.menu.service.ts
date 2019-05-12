import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserMenuEntity } from "../entities";
import { Repository } from "typeorm";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";

@Injectable()
export class UserMenuService {
  constructor(
    @InjectRepository(UserMenuEntity)
    private readonly menuRepository: Repository<UserMenuEntity>,
  ) {}

  //   获取全部菜单信息
  public async getAllMenus() {
    const menus = await this.menuRepository.find({
      relations: ["recipes", "comments"],
    });
    if (!_.isEmpty(menus)) {
      return { data: menus, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   根据ID查找菜单
  public async findMenuById(menuId: any) {
    const menu = await this.menuRepository.findOne(menuId, {
      relations: ["recipes", "comments"],
    });
    if (!_.isEmpty(menu)) {
      return { data: menu, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   添加菜单
  public async saveMenu(data: any) {
    const menu = await this.menuRepository.save(data);
    if (!_.isEmpty(menu)) {
      const menus = await this.menuRepository.find({
        relations: ["recipes", "comments"],
      });
      return { data: menus, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   修改菜单
  public async updateMenu(menuId: any, data: any) {
    let menu = await this.menuRepository.findOne(menuId);
    if (!_.isEmpty(menu)) {
      menu = await this.menuRepository.save(
        this.menuRepository.merge(menu as any, data),
      );
      const menus = await this.menuRepository.find({
        relations: ["recipes", "comments"],
      });
      return { data: menus, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }
}
