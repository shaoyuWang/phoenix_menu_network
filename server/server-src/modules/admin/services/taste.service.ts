import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";
import { TasteEntity } from "../../main/entities";

@Injectable()
export class TasteService {
  constructor(
    @InjectRepository(TasteEntity)
    private readonly tasteRepository: Repository<TasteEntity>,
  ) {}

  //   获取全部口味信息
  public async getAllTastes() {
    let data: any;
    const tastes = await this.tasteRepository.find();
    data = _.assign({}, { tastes });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   根据ID查找口味
  public async findTasteById(tasteId: any) {
    let data: any;
    const taste = await this.tasteRepository.findOne(tasteId);
    data = _.assign({}, { taste });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   添加口味
  public async saveTaste(info: any) {
    let data: any;
    const taste = await this.tasteRepository.save(info);
    data = _.assign({}, { taste });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   修改口味
  public async updateTaste(tasteId: any, info: any) {
    let data: any;
    let taste = await this.tasteRepository.findOne(tasteId);
    if (!_.isEmpty(taste)) {
      taste = await this.tasteRepository.save(
        this.tasteRepository.merge(taste as any, info),
      );
      data = _.assign({}, { taste });
      if (!_.isEmpty(data)) {
        return { data, code: RESPONSE_CODE.SUCCESS };
      } else {
        return { code: RESPONSE_CODE.NOTVALUE };
      }
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  // 删除口味
  public async deleteTaste(tasteId: any) {
    let data: any;
    let taste = await this.tasteRepository.delete(tasteId);
    data = _.assign({}, { taste });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }
}
