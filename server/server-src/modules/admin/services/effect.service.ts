import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";
import { EffectEntity } from "../../main/entities";

@Injectable()
export class EffectService {
  constructor(
    @InjectRepository(EffectEntity)
    private readonly effectRepository: Repository<EffectEntity>,
  ) {}

  //   获取全部功效信息
  public async getAllEffects() {
    let data: any;
    const effects = await this.effectRepository.find();
    data = _.assign({}, { effects });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   根据ID查找功效
  public async findEffectById(effectId: any) {
    let data: any;
    const effect = await this.effectRepository.findOne(effectId);
    data = _.assign({}, { effect });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   添加功效
  public async saveEffect(info: any) {
    let data: any;
    const effect = await this.effectRepository.save(info);
    data = _.assign({}, { effect });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   修改功效
  public async updateEffect(effectId: any, info: any) {
    let data: any;
    let effect = await this.effectRepository.findOne(effectId);
    if (!_.isEmpty(effect)) {
      effect = await this.effectRepository.save(
        this.effectRepository.merge(effect as any, info),
      );
      data = _.assign({}, { effect });
      if (!_.isEmpty(data)) {
        return { data, code: RESPONSE_CODE.SUCCESS };
      } else {
        return { code: RESPONSE_CODE.NOTVALUE };
      }
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  // 删除功效
  public async deleteEffect(effectId: any) {
    let data: any;
    let effect = await this.effectRepository.delete(effectId);
    data = _.assign({}, { effect });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }
}
