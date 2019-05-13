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
import { Roles } from "../../../framework/decorators/role.decorator";
import { LoginGuard } from "../../../framework/guards";
import { TechnologyService } from "../services/technology.service";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";

@Controller("technology")
@UseGuards(LoginGuard)
export class TechnologyController {
  constructor(private readonly technologyServices: TechnologyService) {}

  @Get("/getAllTechnologys")
  @Roles(1, 2)
  public async getTechnologys() {
    return this.technologyServices.getAllTechnologys();
  }

  //   @Get("/findTechnologyById/:id")
  //   @Roles(1, 2)
  //   public async findTechnologyById(@Param("id") technologyId: any) {
  //     if (!_.isEmpty(technologyId)) {
  //       return this.technologyServices.findTechnologyById(technologyId);
  //     } else {
  //       return { code: 500 };
  //     }
  //   }

  @Post("/saveTechnology")
  @Roles(1, 2)
  public async saveTechnology(@Body() data: any) {
    if (!_.isEmpty(data)) {
      return this.technologyServices.saveTechnology(data);
    } else {
      return { code: RESPONSE_CODE.NOTPARAMETER };
    }
  }

  @Put("/updateTechnology/:id")
  @Roles(1)
  public async updateTechnology(
    @Param("id") technologyId: any,
    @Body() data: any,
  ) {
    if (!_.isEmpty(technologyId) && !_.isEmpty(data)) {
      return this.technologyServices.updateTechnology(technologyId, data);
    } else {
      return { code: RESPONSE_CODE.NOTPARAMETER };
    }
  }
}
