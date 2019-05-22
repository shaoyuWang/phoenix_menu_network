import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { Roles } from "../../../framework/decorators/role.decorator";
import { LoginGuard } from "../../../framework/guards";
import { RoleService } from "../services";
import _ from "lodash";
import { TechnologyService } from "../services/technology.service";
@Controller("api/technology")
// @UseGuards(LoginGuard)
export class TechnologyController {
  constructor(private readonly technologyServices: TechnologyService) {}

  @Get("/getAllTechnologys")
  // @Roles(1)
  public async getTechnology() {
    return this.technologyServices.getAllTechnologys();
  }

  @Post("/saveTechnology")
  // @Roles(1)
  public async createTechnology(@Body() data: any) {
    return this.technologyServices.saveTechnology(data);
  }

  @Post("/updateTechnology/:id")
  // @Roles(1)
  public async updateTechnology(
    @Param("id") technologyId: any,
    @Body() data: any,
  ) {
    return this.technologyServices.updateTechnology(technologyId, data);
  }

  // @Post("/deleteTechnology/:id")
  // // @Roles(1)
  // public async deleteTechnology(@Param("id") technologyId: any) {
  //   return this.technologyServices.deleteTechnology(technologyId);
  // }
}
