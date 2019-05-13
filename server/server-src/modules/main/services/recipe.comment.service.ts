import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RecipeCommentEntity } from "../entities";
import { Repository } from "typeorm";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";

@Injectable()
export class RecipeCommentService {
  constructor(
    @InjectRepository(RecipeCommentEntity)
    private readonly recipeCommentRepository: Repository<RecipeCommentEntity>,
  ) {}

  //   获取全部评论信息
  public async getAllComments() {
    const comments = await this.recipeCommentRepository.find({
      relations: ["user"],
    });
    if (!_.isEmpty(comments)) {
      return { data: comments, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   根据ID查找评论
  public async findCommentById(commentId: any) {
    const comment = await this.recipeCommentRepository.findOne(commentId);
    if (!_.isEmpty(comment)) {
      return { data: comment, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   添加评论
  public async saveComment(data: any) {
    const comment = await this.recipeCommentRepository.save(data);
    if (!_.isEmpty(comment)) {
      const comments = await this.recipeCommentRepository.find({
        relations: ["user"],
      });
      return { data: comments, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   点赞评论
  public async praiseComment(commentId: any) {
    let comment = await this.recipeCommentRepository.findOne(commentId);
    if (!_.isEmpty(comment)) {
      let data = { praise: comment!.praise += 1 };
      comment = await this.recipeCommentRepository.save(
        this.recipeCommentRepository.merge(comment as any, data),
      );
      const comments = await this.recipeCommentRepository.find({
        relations: ["user"],
      });
      return { data: comments, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  // 删除评论
  public async deleteComment(commentId: any) {
    const comment = await this.recipeCommentRepository.delete(commentId);
    if (!_.isEmpty(comment)) {
      const comments = await this.recipeCommentRepository.find({
        relations: ["user"],
      });
      return { data: comments, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }
}
