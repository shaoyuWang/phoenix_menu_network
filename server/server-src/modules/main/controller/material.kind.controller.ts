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
import { MaterialKindService } from "../services/material.kind.service";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";

@Controller("materialKind")
@UseGuards(LoginGuard)
export class MaterialKindController {
  constructor(private readonly materialKindServices: MaterialKindService) {}

  @Get("/getAllKinds")
  @Roles(1, 2)
  public async getMaterialKinds() {
    return this.materialKindServices.getAllKinds();
  }

  //   @Get("/findMaterialKindById/:id")
  //   @Roles(1, 2)
  //   public async findMaterialKindById(@Param("id") materialKindId: any) {
  //     if (!_.isEmpty(materialKindId)) {
  //       return this.materialKindServices.findMaterialKindById(materialKindId);
  //     } else {
  //       return { code: 500 };
  //     }
  //   }

  @Post("/saveKind")
  @Roles(1, 2)
  public async saveMaterialKind(@Body() data: any) {
    if (!_.isEmpty(data)) {
      return this.materialKindServices.saveKind(data);
    } else {
      return { code: RESPONSE_CODE.NOTPARAMETER };
    }
  }

  @Put("/updateKind/:id")
  @Roles(1)
  public async updateMaterialKind(
    @Param("id") materialKindId: any,
    @Body() data: any,
  ) {
    if (!_.isEmpty(materialKindId) && !_.isEmpty(data)) {
      return this.materialKindServices.updateKind(materialKindId, data);
    } else {
      return { code: RESPONSE_CODE.NOTPARAMETER };
    }
  }
}
