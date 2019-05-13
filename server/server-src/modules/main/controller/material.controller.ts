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
import { MaterialService } from "../services/material.service";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";

@Controller("material")
@UseGuards(LoginGuard)
export class MaterialController {
  constructor(private readonly materialServices: MaterialService) {}

  @Get("/getAllMaterials")
  @Roles(1, 2)
  public async getMaterials() {
    return this.materialServices.getAllMaterials();
  }

  //   @Get("/findMaterialById/:id")
  //   @Roles(1, 2)
  //   public async findMaterialById(@Param("id") materialId: any) {
  //     if (!_.isEmpty(materialId)) {
  //       return this.materialServices.findMaterialById(materialId);
  //     } else {
  //       return { code: 500 };
  //     }
  //   }

  @Post("/saveMaterial")
  @Roles(1, 2)
  public async saveMaterial(@Body() data: any) {
    if (!_.isEmpty(data)) {
      return this.materialServices.saveMaterial(data);
    } else {
      return { code: RESPONSE_CODE.NOTPARAMETER };
    }
  }

  @Put("/updateMaterial/:id")
  @Roles(1)
  public async updateMaterial(@Param("id") materialId: any, @Body() data: any) {
    if (!_.isEmpty(materialId) && !_.isEmpty(data)) {
      return this.materialServices.updateMaterial(materialId, data);
    } else {
      return { code: RESPONSE_CODE.NOTPARAMETER };
    }
  }
}
