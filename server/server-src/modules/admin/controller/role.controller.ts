import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Roles } from "../../../framework/decorators/role.decorator";
import { RoleEntity } from "../entities";
import { LoginGuard } from "../../../framework/guards";

// import * as _ from "lodash";
@Controller("roles")
@UseGuards(LoginGuard)
export class RoleController {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  @Get()
  @Roles(1, 2)
  public async getRoles() {
    return await this.roleRepository.find();
  }

  @Post()
  @Roles(1)
  public async createRole(@Body() info: any) {
    return await this.roleRepository.save(info);
  }

  @Put(":id")
  @Roles(1)
  public async updateRole(@Param("id") paramId: any, @Body() info: any) {
    return await this.roleRepository.update(paramId, info);
  }

  @Delete(":id")
  @Roles(1)
  public async deleteRole(@Param("id") paramId: any) {
    return await this.roleRepository.delete(paramId);
  }
}
