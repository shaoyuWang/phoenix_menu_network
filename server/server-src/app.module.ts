import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { coreModule } from "./framework/core";
import { adminModule } from "./modules/admin";
import { mainModule } from "./modules/main";
// import { DATABASE_CONFIG } from './framework/config';
import {
  UserEntity,
  RoleEntity,
  UserMenuEntity,
  UserMenuCommentEntity,
  UserDiaryEntity,
  UserDiaryCommentEntity,
  UserCollectionEntity,
} from "./modules/admin/entities";
import _ from "lodash";
import { RepositoryModule } from "./framework/config";
import {
  RecipeEntity,
  RecipeCommentEntity,
  SortEntity,
  SortKindEntity,
  StepEntity,
  TasteEntity,
  TechnologyEntity,
  MaterialEntity,
  EffectEntity,
  EffectKindEntity,
  MajorRecipeMaterialEntity,
  AuxiliaryRecipeMaterialEntity,
  MaterialKindEntity,
  RecipeVideoEntity,
} from "./modules/main/entities";

const {
  env: {
    DATABASE_NAME,
    DATABASE_HOST,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    DATABASE_PORT,
  },
} = process;

const adminEntities = [
  UserEntity,
  RoleEntity,
  UserMenuEntity,
  UserMenuCommentEntity,
  UserDiaryEntity,
  UserDiaryCommentEntity,
  UserCollectionEntity,
];

const mainEntities = [
  RecipeEntity,
  RecipeCommentEntity,
  SortEntity,
  SortKindEntity,
  StepEntity,
  TasteEntity,
  TechnologyEntity,
  EffectEntity,
  EffectKindEntity,
  MaterialEntity,
  MaterialKindEntity,
  MajorRecipeMaterialEntity,
  AuxiliaryRecipeMaterialEntity,
  RecipeVideoEntity,
];

const entities = [...adminEntities, ...mainEntities];

const modules = [
  // TypeOrmModule.forRoot(DATABASE_CONFIG),
  TypeOrmModule.forRoot({
    database: DATABASE_NAME,
    entities: entities,
    host: DATABASE_HOST,
    logging: true,
    password: DATABASE_PASSWORD,
    port: _.toNumber(DATABASE_PORT),
    synchronize: true,
    type: "mysql",
    username: DATABASE_USERNAME,
  }),
  RepositoryModule.forFeature(entities),
  coreModule,
  adminModule,
  mainModule,
];

@Module({
  imports: modules,
})
export class AppModule {}
