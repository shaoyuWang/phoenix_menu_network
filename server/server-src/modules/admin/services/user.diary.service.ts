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
    const diarys = await this.diaryRepository.find({
      relations: ["user", "comments"],
    });
    if (!_.isEmpty(diarys)) {
      return { data: diarys, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   根据ID查找日记
  public async findDiaryById(diaryId: any) {
    const diary = await this.diaryRepository.findOne(diaryId);
    if (!_.isEmpty(diary)) {
      return { data: diary, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   添加日记
  public async saveDiary(data: any) {
    const diary = await this.diaryRepository.save(data);
    if (!_.isEmpty(diary)) {
      const diarys = await this.diaryRepository.find({
        relations: ["user", "comments"],
      });
      return { data: diarys, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   修改日记
  public async updateDiary(diaryId: any, data: any) {
    let diary = await this.diaryRepository.findOne(diaryId);
    if (!_.isEmpty(diary)) {
      diary = await this.diaryRepository.save(
        this.diaryRepository.merge(diary as any, data),
      );
      const diarys = await this.diaryRepository.find({
        relations: ["user", "comments"],
      });
      return { data: diarys, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }
}
