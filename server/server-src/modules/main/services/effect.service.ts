import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EffectEntity } from "../entities";
import { Repository } from "typeorm";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";

@Injectable()
export class EffectService {
  constructor(
    @InjectRepository(EffectEntity)
    private readonly effectRepository: Repository<EffectEntity>,
  ) {}

  //   获取全部功效信息
  public async getAllEffects() {
    const effects = await this.effectRepository.find();
    if (!_.isEmpty(effects)) {
      return { data: effects, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   添加功效
  public async saveEffect(data: any) {
    const effect = await this.effectRepository.save(data);
    if (!_.isEmpty(effect)) {
      const effects = await this.effectRepository.find();
      return { data: effects, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   修改功效
  public async updateEffect(effectId: any, data: any) {
    let effect = await this.effectRepository.findOne(effectId);
    if (!_.isEmpty(effect)) {
      effect = await this.effectRepository.save(
        this.effectRepository.merge(effect as any, data),
      );
      const effects = await this.effectRepository.find();
      return { data: effects, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }
}
