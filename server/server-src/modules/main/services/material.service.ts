import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MaterialEntity } from "../entities";
import { Repository } from "typeorm";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(MaterialEntity)
    private readonly materialRepository: Repository<MaterialEntity>,
  ) {}

  //   获取全部材料信息
  public async getAllMaterials() {
    const materials = await this.materialRepository.find({
      relations: ["kind"],
    });
    if (!_.isEmpty(materials)) {
      return { data: materials, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   根据ID查找材料
  public async findMaterialById(materialId: any) {
    const material = await this.materialRepository.findOne(materialId);
    if (!_.isEmpty(material)) {
      return { data: material, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   添加材料
  public async saveMaterial(data: any) {
    const material = await this.materialRepository.save(data);
    if (!_.isEmpty(material)) {
      const materials = await this.materialRepository.find({
        relations: ["kind"],
      });
      return { data: materials, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   修改材料
  public async updateMaterial(materialId: any, data: any) {
    let material = await this.materialRepository.findOne(materialId);
    if (!_.isEmpty(material)) {
      material = await this.materialRepository.save(
        this.materialRepository.merge(material as any, data),
      );
      const materials = await this.materialRepository.find({
        relations: ["kind"],
      });
      return { data: materials, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }
}
