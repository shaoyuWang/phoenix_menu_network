import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminModule } from "./modules/admin";
// import { DATABASE_CONFIG } from './framework/config';
import { UserEntity, RoleEntity } from "./modules/admin/entities";
import _ from "lodash";

const {
  env: {
    DATABASE_NAME,
    DATABASE_HOST,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    DATABASE_PORT,
  },
} = process;

const adminEntities = [UserEntity, RoleEntity];
const modules = [
  // TypeOrmModule.forRoot(DATABASE_CONFIG),
  TypeOrmModule.forRoot({
    database: DATABASE_NAME,
    entities: [...adminEntities],
    host: DATABASE_HOST,
    logging: true,
    password: DATABASE_PASSWORD,
    port: _.toNumber(DATABASE_PORT),
    synchronize: true,
    type: "mysql",
    username: DATABASE_USERNAME,
  }),
  AdminModule,
];

@Module({
  imports: modules,
})
export class AppModule {}
