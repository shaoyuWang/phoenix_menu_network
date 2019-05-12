import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SortKindEntity } from "../entities";
import { Repository } from "typeorm";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";

@Injectable()
export class SortKindService {
  constructor(
    @InjectRepository(SortKindEntity)
    private readonly sortKindRepository: Repository<SortKindEntity>,
  ) {}

  //   获取全部分类信息
  public async getAllKinds() {
    const kinds = await this.sortKindRepository.find();
    if (!_.isEmpty(kinds)) {
      return { data: kinds, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   根据ID查找分类
  public async findKindById(kindId: any) {
    const kind = await this.sortKindRepository.findOne(kindId);
    if (!_.isEmpty(kind)) {
      return { data: kind, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   添加分类
  public async saveKind(data: any) {
    const kind = await this.sortKindRepository.save(data);
    if (!_.isEmpty(kind)) {
      return { data: kind, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   修改分类
  public async updateKind(kindId: any, data: any) {
    let kind = await this.sortKindRepository.findOne(kindId);
    if (!_.isEmpty(kind)) {
      kind = await this.sortKindRepository.save(
        this.sortKindRepository.merge(kind as any, data),
      );
      return { data: kind, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }
}
