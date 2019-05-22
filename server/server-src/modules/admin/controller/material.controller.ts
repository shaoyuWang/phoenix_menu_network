import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Roles } from "../../../framework/decorators/role.decorator";
import { LoginGuard } from "../../../framework/guards";
import _ from "lodash";
import { MaterialService } from "../services/material.service";
@Controller("api/material")
// @UseGuards(LoginGuard)
export class MaterialController {
  constructor(private readonly materialServices: MaterialService) {}

  @Get("/getAllMaterials")
  // @Roles(1)
  public async getAllMaterials() {
    return this.materialServices.getAllMaterials();
  }

  @Get("/getAllMaterialKinds")
  // @Roles(1)
  public async getAllMaterialKinds() {
    return this.materialServices.getAllMaterialKinds();
  }

  @Post("/saveMaterial")
  // @Roles(1)
  public async createMaterial(@Body() data: any) {
    return this.materialServices.saveMaterial(data);
  }

  @Post("/updateMaterial/:id")
  // @Roles(1)
  public async updateMaterial(@Param("id") materialId: any, @Body() data: any) {
    return this.materialServices.updateMaterial(materialId, data);
  }

  // @Post("/deleteMaterial/:id")
  // // @Roles(1)
  // public async deleteMaterial(@Param("id") materialId: any) {
  //   return this.materialServices.deleteMaterial(materialId);
  // }
}
