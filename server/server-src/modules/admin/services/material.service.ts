import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";
import { MaterialEntity, MaterialKindEntity } from "../../main/entities";

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(MaterialEntity)
    private readonly materialRepository: Repository<MaterialEntity>,
    @InjectRepository(MaterialKindEntity)
    private readonly materialKindRepository: Repository<MaterialKindEntity>,
  ) {}

  //   获取全部材料信息
  public async getAllMaterials() {
    let data: any;
    const materials = await this.materialRepository.find({
      relations: ["kind"],
    });
    data = _.assign({}, { materials });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   获取全部材料分类信息
  public async getAllMaterialKinds() {
    let data: any;
    const kinds = await this.materialKindRepository.find();
    data = _.assign({}, { kinds });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   根据ID查找材料
  public async findMaterialById(materialId: any) {
    let data: any;
    const material = await this.materialRepository.findOne(materialId, {
      relations: ["kind"],
    });
    data = _.assign({}, { material });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   添加材料
  public async saveMaterial(info: any) {
    let data: any;
    const material = await this.materialRepository.save(info);
    data = _.assign({}, { material });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   修改材料
  public async updateMaterial(materialId: any, info: any) {
    let data: any;
    let material = await this.materialRepository.findOne(materialId, {
      relations: ["kind"],
    });
    if (!_.isEmpty(material)) {
      material = await this.materialRepository.save(
        this.materialRepository.merge(material as any, info),
      );
      data = _.assign({}, { material });
      if (!_.isEmpty(data)) {
        return { data, code: RESPONSE_CODE.SUCCESS };
      } else {
        return { code: RESPONSE_CODE.NOTVALUE };
      }
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  // 删除材料
  public async deleteMaterial(materialId: any) {
    let data: any;
    let material = await this.materialRepository.delete(materialId);
    data = _.assign({}, { material });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }
}
