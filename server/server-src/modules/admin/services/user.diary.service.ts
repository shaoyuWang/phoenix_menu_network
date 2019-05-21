import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDiaryEntity } from "../entities";
import { Repository } from "typeorm";
import { RESPONSE_CODE } from "../../../framework/enums";
import _ from "lodash";

@Injectable()
export class UserDiaryService {
  constructor(
    @InjectRepository(UserDiaryEntity)
    private readonly diaryRepository: Repository<UserDiaryEntity>,
  ) {}

  //   获取全部日记信息
  public async getAllDiarys() {
    let data: any;
    const diarys = await this.diaryRepository.find({
      relations: ["user"],
    });
    data = _.assign({}, { diarys });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   添加日记
  public async saveDiary(info: any) {
    let data: any;
    const diary = await this.diaryRepository.save(info);
    data = _.assign({}, { diary });
    if (!_.isEmpty(diary)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   修改日记
  public async updateDiary(diaryId: any, info: any) {
    let data: any;
    let diary = await this.diaryRepository.findOne(diaryId);
    if (!_.isEmpty(diary)) {
      diary = await this.diaryRepository.save(
        this.diaryRepository.merge(diary as any, info),
      );
      data = _.assign({}, { diary });
      if (!_.isEmpty(data)) {
        return { data, code: RESPONSE_CODE.SUCCESS };
      } else {
        return { code: RESPONSE_CODE.NOTVALUE };
      }
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  // 删除日记
  public async deleteDiary(diaryId: any) {
    let data: any;
    let diary = await this.diaryRepository.delete(diaryId);
    data = _.assign({}, { diary });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }
}
