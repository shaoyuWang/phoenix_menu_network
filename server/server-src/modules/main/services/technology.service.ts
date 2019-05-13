import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TechnologyEntity } from "../entities";
import { Repository } from "typeorm";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";

@Injectable()
export class TechnologyService {
  constructor(
    @InjectRepository(TechnologyEntity)
    private readonly technologyRepository: Repository<TechnologyEntity>,
  ) {}

  //   获取全部工艺信息
  public async getAllTechnologys() {
    const technologys = await this.technologyRepository.find();
    if (!_.isEmpty(technologys)) {
      return { data: technologys, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   根据ID查找工艺
  public async findTechnologyById(technologyId: any) {
    const technology = await this.technologyRepository.findOne(technologyId);
    if (!_.isEmpty(technology)) {
      return { data: technology, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   添加工艺
  public async saveTechnology(data: any) {
    const technology = await this.technologyRepository.save(data);
    if (!_.isEmpty(technology)) {
      const technologys = await this.technologyRepository.find();
      return { data: technologys, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   修改工艺
  public async updateTechnology(technologyId: any, data: any) {
    let technology = await this.technologyRepository.findOne(technologyId);
    if (!_.isEmpty(technology)) {
      technology = await this.technologyRepository.save(
        this.technologyRepository.merge(technology as any, data),
      );
      const technologys = await this.technologyRepository.find();
      return { data: technologys, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }
}
