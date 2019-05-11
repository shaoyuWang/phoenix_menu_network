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
import { UserEntity } from "../entities";
import { LoginGuard } from "../../../framework/guards";

// import * as _ from "lodash";
@Controller("users")
@UseGuards(LoginGuard)
export class UserController {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  @Get()
  @Roles(1, 2)
  public async getUsers() {
    const users = await this.userRepository.find({ relations: ["roles"] });
    return { data: users };
  }

  @Post()
  @Roles(1)
  public async createUser(@Body() info: any) {
    const user = await this.userRepository.save(info);
    return { data: user };
  }

  @Put(":id")
  @Roles(1)
  public async updateUser(@Param("id") paramId: any, @Body() info: any) {
    let user = await this.userRepository.findOne(paramId);
    user = await this.userRepository.save(
      this.userRepository.merge(user!, info),
    );
    return { data: user };
  }

  @Delete(":id")
  @Roles(1)
  public async deleteUser(@Param("id") paramId: any) {
    const user = await this.userRepository.delete(paramId);
    return { data: user };
  }
}
