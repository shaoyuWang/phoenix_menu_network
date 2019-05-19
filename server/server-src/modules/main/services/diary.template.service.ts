import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";
import {
  UserEntity,
  UserDiaryCommentEntity,
  UserDiaryEntity,
} from "../../admin/entities";

@Injectable()
export class DiaryTemplateService {
  constructor(
    @InjectRepository(UserDiaryEntity)
    private readonly diaryRepository: Repository<UserDiaryEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserDiaryCommentEntity)
    private readonly diaryCommentRepository: Repository<UserDiaryCommentEntity>,
  ) {}

  //  获取日记信息
  public async findDiaryById(commentId: number) {
    let data: any;
    let diary: any;
    if (!_.isEmpty(commentId)) {
      diary = await this.diaryRepository.findOne(_.toNumber(commentId), {
        relations: ["user", "comments"],
      });
    }
    data = _.assign({}, { diary });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //  获取用户信息
  public async findUserById(userId: number) {
    let data: any;
    let user: any;
    if (!_.isEmpty(userId)) {
      user = await this.userRepository.findOne(_.toNumber(userId), {
        relations: ["diarys", "menus", "recipes", "collections"],
      });
    }
    data = _.assign({}, { user });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   添加评论
  public async saveComment(data: any) {
    const comment = await this.diaryCommentRepository.save(data);
    if (!_.isEmpty(comment)) {
      return { data: comment, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  // 点赞
  public async praiseComment(commentId: number) {
    let comment = await this.diaryCommentRepository.findOne(commentId);
    if (!_.isEmpty(comment)) {
      let data = { praise: comment!.praise += 1 };
      comment = await this.diaryCommentRepository.save(
        this.diaryCommentRepository.merge(comment as any, data),
      );
      return { data: comment, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }
}
