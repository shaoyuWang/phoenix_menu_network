import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TasteEntity } from "../entities";
import { Repository } from "typeorm";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";

@Injectable()
export class TasteService {
  constructor(
    @InjectRepository(TasteEntity)
    private readonly tasteRepository: Repository<TasteEntity>,
  ) {}

  //   获取全部口味信息
  public async getAllTastes() {
    const tastes = await this.tasteRepository.find();
    if (!_.isEmpty(tastes)) {
      return { data: tastes, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   添加口味
  public async saveTaste(data: any) {
    const taste = await this.tasteRepository.save(data);
    if (!_.isEmpty(taste)) {
      const tastes = await this.tasteRepository.find();
      return { data: tastes, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   修改口味
  public async updateTaste(tasteId: any, data: any) {
    let taste = await this.tasteRepository.findOne(tasteId);
    if (!_.isEmpty(taste)) {
      taste = await this.tasteRepository.save(
        this.tasteRepository.merge(taste as any, data),
      );
      const tastes = await this.tasteRepository.find();
      return { data: tastes, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }
}
