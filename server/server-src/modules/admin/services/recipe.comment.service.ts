import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDiaryCommentEntity } from "../entities";
import { Repository } from "typeorm";
import _ from "lodash";
import moment from "moment";
import { RESPONSE_CODE } from "../../../framework/enums";
import { RecipeCommentEntity } from "../../main/entities";

@Injectable()
export class RecipeCommentService {
  constructor(
    @InjectRepository(RecipeCommentEntity)
    private readonly commentRepository: Repository<RecipeCommentEntity>,
  ) {}

  //   获取全部评论信息
  public async getAllComments() {
    let data: any;
    const comments = await this.commentRepository.find();
    data = _.assign({}, { comments });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  // 删除评论
  public async deleteComment(commentId: any) {
    let data: any;
    const comment = await this.commentRepository.delete(commentId);
    data = _.assign({}, { comment });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }
}
