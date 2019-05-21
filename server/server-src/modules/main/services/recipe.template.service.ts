import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";
import { RecipeEntity, RecipeCommentEntity } from "../entities";
import { UserEntity, UserCollectionEntity } from "../../admin/entities";

@Injectable()
export class RecipeTemplateService {
  constructor(
    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RecipeCommentEntity)
    private readonly recipeCommentEntity: Repository<RecipeCommentEntity>,
    @InjectRepository(UserCollectionEntity)
    private readonly userCollectionRepository: Repository<UserCollectionEntity>,
  ) {}

  //  获取菜谱信息
  public async findRecipeById(recipeId: number) {
    let data: any;
    let recipe: any;
    if (!_.isEmpty(recipeId)) {
      recipe = await this.recipeRepository.findOne(_.toNumber(recipeId), {
        relations: [
          "user",
          "technology",
          "taste",
          "steps",
          "majorMaterials",
          "auxiliaryMaterials",
          "sort",
          "effects",
          "comments",
        ],
      });
    }
    data = _.assign({}, { recipe });
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
    const comment = await this.recipeCommentEntity.save(data);
    if (!_.isEmpty(comment)) {
      return { data: comment, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  // 收藏菜谱
  public async collectionRecipe(info: any) {
    let data: any;
    let collection = await this.userCollectionRepository.save(info);
    data = _.assign({}, { collection });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  // 添加到菜单

  // 点赞
  public async praiseComment(commentId: number) {
    let comment = await this.recipeCommentEntity.findOne(commentId);
    if (!_.isEmpty(comment)) {
      let data = { praise: comment!.praise += 1 };
      comment = await this.recipeCommentEntity.save(
        this.recipeCommentEntity.merge(comment as any, data),
      );
      return { data: comment, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }
}
