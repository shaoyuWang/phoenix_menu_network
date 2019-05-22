import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";
import { TechnologyEntity } from "../../main/entities";

@Injectable()
export class TechnologyService {
  constructor(
    @InjectRepository(TechnologyEntity)
    private readonly technologyRepository: Repository<TechnologyEntity>,
  ) {}

  //   获取全部工艺信息
  public async getAllTechnologys() {
    let data: any;
    const technologys = await this.technologyRepository.find();
    data = _.assign({}, { technologys });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   根据ID查找工艺
  public async findTechnologyById(technologyId: any) {
    let data: any;
    const technology = await this.technologyRepository.findOne(technologyId);
    data = _.assign({}, { technology });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   添加工艺
  public async saveTechnology(info: any) {
    let data: any;
    const technology = await this.technologyRepository.save(info);
    data = _.assign({}, { technology });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   修改工艺
  public async updateTechnology(technologyId: any, info: any) {
    let data: any;
    let technology = await this.technologyRepository.findOne(technologyId);
    if (!_.isEmpty(technology)) {
      technology = await this.technologyRepository.save(
        this.technologyRepository.merge(technology as any, info),
      );
      data = _.assign({}, { technology });
      if (!_.isEmpty(data)) {
        return { data, code: RESPONSE_CODE.SUCCESS };
      } else {
        return { code: RESPONSE_CODE.NOTVALUE };
      }
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  // 删除工艺
  public async deleteTechnology(technologyId: any) {
    let data: any;
    let technology = await this.technologyRepository.delete(technologyId);
    data = _.assign({}, { technology });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }
}
