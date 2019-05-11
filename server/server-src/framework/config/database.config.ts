import { ConnectionOptions } from "typeorm";
import utils from "../../utils";
import { UserEntity } from "../../modules/admin/entities";

const {
  env: { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_PORT },
} = process;

export const DATABASE_CONFIG: ConnectionOptions = {
  database: "menu",
  // entities: [
  //   utils.getPath(__dirname, "../../modules/admin/entities/**.entity{.ts,.js}"),
  // ],
  entities: [UserEntity],
  logging: true,
  host: "localhost",
  password: "jwcss44wxd",
  port: 3306,
  synchronize: true,
  type: "mysql",
  username: "root"
};
