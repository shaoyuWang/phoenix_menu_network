import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";
import { SortEntity, SortKindEntity } from "../../main/entities";

@Injectable()
export class SortService {
  constructor(
    @InjectRepository(SortEntity)
    private readonly sortRepository: Repository<SortEntity>,
    @InjectRepository(SortKindEntity)
    private readonly sortKindRepository: Repository<SortKindEntity>,
  ) {}

  //   获取全部菜谱种类信息
  public async getAllSorts() {
    let data: any;
    const sorts = await this.sortRepository.find({ relations: ["kind"] });
    data = _.assign({}, { sorts });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   获取全部菜系分类信息
  public async getAllSortKinds() {
    let data: any;
    const kinds = await this.sortKindRepository.find();
    data = _.assign({}, { kinds });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   根据ID查找菜谱种类
  public async findSortById(sortId: any) {
    let data: any;
    const sort = await this.sortRepository.findOne(sortId, {
      relations: ["kind"],
    });
    data = _.assign({}, { sort });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   添加菜谱种类
  public async saveSort(info: any) {
    let data: any;
    const sort = await this.sortRepository.save(info);
    data = _.assign({}, { sort });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   修改菜谱种类
  public async updateSort(sortId: any, info: any) {
    let data: any;
    let sort = await this.sortRepository.findOne(sortId, {
      relations: ["kind"],
    });
    if (!_.isEmpty(sort)) {
      sort = await this.sortRepository.save(
        this.sortRepository.merge(sort as any, info),
      );
      data = _.assign({}, { sort });
      if (!_.isEmpty(data)) {
        return { data, code: RESPONSE_CODE.SUCCESS };
      } else {
        return { code: RESPONSE_CODE.NOTVALUE };
      }
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  // 删除菜谱种类
  public async deleteSort(sortId: any) {
    let data: any;
    let sort = await this.sortRepository.delete(sortId);
    data = _.assign({}, { sort });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }
}
