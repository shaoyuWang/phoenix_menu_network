import { Module } from "@nestjs/common";
import {
  AuthorityController,
  UserController,
  RoleController,
} from "./controller";
import { LocalStrategyService, SerializerService } from "./services";

const controllers = [AuthorityController, UserController, RoleController];

const services = [LocalStrategyService, SerializerService];

@Module({
  controllers: controllers,
  providers: services,
})
export class AdminModule {}
