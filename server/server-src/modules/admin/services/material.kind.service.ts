import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";
import { MaterialKindEntity } from "../../main/entities";

@Injectable()
export class MaterialKindService {
  constructor(
    @InjectRepository(MaterialKindEntity)
    private readonly materialKindRepository: Repository<MaterialKindEntity>,
  ) {}

  //   获取全部材料分类信息
  public async getAllMaterialKinds() {
    let data: any;
    const materialKinds = await this.materialKindRepository.find();
    data = _.assign({}, { materialKinds });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   根据ID查找材料分类
  public async findMaterialKindById(materialKindId: any) {
    let data: any;
    const materialKind = await this.materialKindRepository.findOne(
      materialKindId,
    );
    data = _.assign({}, { materialKind });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   添加材料分类
  public async saveMaterialKind(info: any) {
    let data: any;
    const materialKind = await this.materialKindRepository.save(info);
    data = _.assign({}, { materialKind });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   修改材料分类
  public async updateMaterialKind(materialKindId: any, info: any) {
    let data: any;
    let materialKind = await this.materialKindRepository.findOne(
      materialKindId,
    );
    if (!_.isEmpty(materialKind)) {
      materialKind = await this.materialKindRepository.save(
        this.materialKindRepository.merge(materialKind as any, info),
      );
      data = _.assign({}, { materialKind });
      if (!_.isEmpty(data)) {
        return { data, code: RESPONSE_CODE.SUCCESS };
      } else {
        return { code: RESPONSE_CODE.NOTVALUE };
      }
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  // 删除材料分类
  public async deleteMaterialKind(materialKindId: any) {
    let data: any;
    let materialKind = await this.materialKindRepository.delete(materialKindId);
    data = _.assign({}, { materialKind });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }
}
