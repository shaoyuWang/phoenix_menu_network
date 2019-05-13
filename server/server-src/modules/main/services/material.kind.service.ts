import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MaterialKindEntity } from "../entities";
import { Repository } from "typeorm";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";

@Injectable()
export class MaterialKindService {
  constructor(
    @InjectRepository(MaterialKindEntity)
    private readonly materialKindRepository: Repository<MaterialKindEntity>,
  ) {}

  //   获取全部种类信息
  public async getAllKinds() {
    const kinds = await this.materialKindRepository.find({
      relations: ["materials"],
    });
    if (!_.isEmpty(kinds)) {
      return { data: kinds, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   根据ID查找种类
  public async findKindById(kindId: any) {
    const kind = await this.materialKindRepository.findOne(kindId);
    if (!_.isEmpty(kind)) {
      return { data: kind, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   添加种类
  public async saveKind(data: any) {
    const kind = await this.materialKindRepository.save(data);
    if (!_.isEmpty(kind)) {
      const kinds = await this.materialKindRepository.find({
        relations: ["materials"],
      });
      return { data: kinds, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   修改种类
  public async updateKind(kindId: any, data: any) {
    let kind = await this.materialKindRepository.findOne(kindId);
    if (!_.isEmpty(kind)) {
      kind = await this.materialKindRepository.save(
        this.materialKindRepository.merge(kind as any, data),
      );
      const kinds = await this.materialKindRepository.find({
        relations: ["materials"],
      });
      return { data: kinds, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }
}
