import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";
import { UserEntity, UserMenuEntity } from "../../admin/entities";
import {
  TasteEntity,
  TechnologyEntity,
  EffectEntity,
  SortEntity,
  MaterialEntity,
  RecipeEntity,
  MajorRecipeMaterialEntity,
  AuxiliaryRecipeMaterialEntity,
} from "../entities";

@Injectable()
export class UserCenterService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserMenuEntity)
    private readonly userMenuRepository: Repository<UserMenuEntity>,
    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,
    @InjectRepository(MajorRecipeMaterialEntity)
    private readonly majorMaterialRepository: Repository<
      MajorRecipeMaterialEntity
    >,
    @InjectRepository(AuxiliaryRecipeMaterialEntity)
    private readonly auxiliaryMaterialRepository: Repository<
      AuxiliaryRecipeMaterialEntity
    >,
    @InjectRepository(TasteEntity)
    private readonly tasteRepository: Repository<TasteEntity>,
    @InjectRepository(TechnologyEntity)
    private readonly technologyRepository: Repository<TechnologyEntity>,
    @InjectRepository(EffectEntity)
    private readonly effectRepository: Repository<EffectEntity>,
    @InjectRepository(SortEntity)
    private readonly sortRepository: Repository<SortEntity>,
    @InjectRepository(MaterialEntity)
    private readonly materialRepository: Repository<MaterialEntity>,
  ) {}

  //   获取菜谱基本信息
  public async getRecipeBaseInfo() {
    let data: any;
    let tastes = await this.tasteRepository.find();
    let technologys = await this.technologyRepository.find();
    let effects = await this.effectRepository.find();
    let sorts = await this.sortRepository.find();
    let materials = await this.materialRepository.find();
    data = _.assign(
      {},
      { tastes },
      { technologys },
      { effects },
      { sorts },
      { materials },
    );
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  // 创建菜谱
  public async saveRecipe(info: any) {
    const { majorMaterials, auxiliaryMaterials } = info;
    let data: any;
    let recipe = await this.recipeRepository.save(info);
    _.forEach(majorMaterials, (item) => {
      item.recipe = recipe;
    });
    _.forEach(auxiliaryMaterials, (item) => {
      item.recipe = recipe;
    });
    let major = await this.majorMaterialRepository.save(majorMaterials);
    let axu = await this.auxiliaryMaterialRepository.save(auxiliaryMaterials);
    recipe = await this.recipeRepository.findOne(recipe.id, {
      relations: [
        "user",
        "taste",
        "technology",
        "majorMaterials",
        "auxiliaryMaterials",
        "effects",
        "sort",
      ],
    });
    data = _.assign({}, { recipe });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   获取用户信息
  public async getUser(userId: any) {
    let data: any;
    let user = await this.userRepository.findOne(userId);
    data = _.assign({}, { user });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   根据ID查找用户
  public async findUserById(userId: any) {
    let data: any;
    const user = await this.userRepository.findOne(userId);
    data = _.assign({}, { user });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   修改用户
  public async updateUser(userId: any, info: any) {
    let data: any;
    let user = await this.userRepository.findOne(userId);
    if (!_.isEmpty(user)) {
      user = await this.userRepository.save(
        this.userRepository.merge(user as any, info),
      );
      data = _.assign({}, { user });
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   获取菜谱信息
  public async getRecipe(userId: any) {
    let data: any;
    let user = await this.userRepository.findOne(userId, {
      relations: ["recipes"],
    });
    data = _.assign({}, { recipes: user!.recipes });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  // 删除菜谱
  public async deleteRecie(recipeId: any) {
    let data: any;
    let recipe = await this.recipeRepository.delete(recipeId);
    data = _.assign({}, { recipe });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   获取收藏信息
  public async getCollection(userId: any) {
    let data: any;
    let user = await this.userRepository.findOne(userId, {
      relations: ["collections"],
    });
    data = _.assign({}, { collections: user!.collections });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   获取菜单信息
  public async getMenu(userId: any) {
    let data: any;
    let user = await this.userRepository.findOne(userId);
    let menus = await this.userMenuRepository.find({
      relations: ["recipes"],
      where: { user },
    });
    data = _.assign({}, { menus });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }

  //   获取日记信息
  public async getDiary(userId: any) {
    let data: any;
    let user = await this.userRepository.findOne(userId, {
      relations: ["diarys"],
    });
    data = _.assign({}, { diarys: user!.diarys });
    if (!_.isEmpty(data)) {
      return { data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }
}
