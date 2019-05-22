import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";
import { SortKindEntity } from "../../main/entities";

@Injectable()
export class SortKindService {
  constructor(
    @InjectRepository(SortKindEntity)
    private readonly sortKindRepository: Repository<SortKindEntity>,
  ) {}

  //   获取全部菜系分类信息
  public async getAllSortKinds() {
    let data: any;
    const sortKinds = await this.sortKindRepository.find();
    data = _.assign({}, { sortKinds });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   根据ID查找菜系分类
  public async findSortKindById(sortKindId: any) {
    let data: any;
    const sortKind = await this.sortKindRepository.findOne(sortKindId);
    data = _.assign({}, { sortKind });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   添加菜系分类
  public async saveSortKind(info: any) {
    let data: any;
    const sortKind = await this.sortKindRepository.save(info);
    data = _.assign({}, { sortKind });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   修改菜系分类
  public async updateSortKind(sortKindId: any, info: any) {
    let data: any;
    let sortKind = await this.sortKindRepository.findOne(sortKindId);
    if (!_.isEmpty(sortKind)) {
      sortKind = await this.sortKindRepository.save(
        this.sortKindRepository.merge(sortKind as any, info),
      );
      data = _.assign({}, { sortKind });
      if (!_.isEmpty(data)) {
        return { data, code: RESPONSE_CODE.SUCCESS };
      } else {
        return { code: RESPONSE_CODE.NOTVALUE };
      }
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  // 删除菜系分类
  public async deleteSortKind(sortKindId: any) {
    let data: any;
    let sortKind = await this.sortKindRepository.delete(sortKindId);
    data = _.assign({}, { sortKind });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }
}
