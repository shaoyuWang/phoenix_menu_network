import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SortEntity } from "../entities";
import { Repository } from "typeorm";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";

@Injectable()
export class SortService {
  constructor(
    @InjectRepository(SortEntity)
    private readonly sortRepository: Repository<SortEntity>,
  ) {}

  //   获取全部分类信息
  public async getAllSorts() {
    const sorts = await this.sortRepository.find({ relations: ["kind"] });
    if (!_.isEmpty(sorts)) {
      return { data: sorts, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   根据ID查找分类
  public async findSortById(sortId: any) {
    const sort = await this.sortRepository.findOne(sortId);
    if (!_.isEmpty(sort)) {
      return { data: sort, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   添加分类
  public async saveSort(data: any) {
    const sort = await this.sortRepository.save(data);
    if (!_.isEmpty(sort)) {
      const sorts = await this.sortRepository.find({ relations: ["kind"] });
      return { data: sorts, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   修改分类
  public async updateSort(sortId: any, data: any) {
    let sort = await this.sortRepository.findOne(sortId);
    if (!_.isEmpty(sort)) {
      sort = await this.sortRepository.save(
        this.sortRepository.merge(sort as any, data),
      );
      const sorts = await this.sortRepository.find({ relations: ["kind"] });
      return { data: sorts, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }
}
