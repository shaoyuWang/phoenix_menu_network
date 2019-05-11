import { Module } from "@nestjs/common";
import { RepositoryModule } from '../../framework/config';
import { AuthorityController,  UserController, RoleController } from './controller';
import { UserEntity, RoleEntity } from './entities';
import { LocalStrategyService, SerializerService } from './services';

// controller
const controllers = [
    AuthorityController,
    UserController,
    RoleController,
  ];

const entities = [
    UserEntity,
    RoleEntity,
];

const services = [
    LocalStrategyService, 
    SerializerService,
];

const modules = [RepositoryModule.forFeature(entities)];

@Module({
    imports: modules,
    controllers: controllers,
    providers: services,
})

export class AdminModule {}