import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Roles } from "../../../framework/decorators/role.decorator";
import { LoginGuard } from "../../../framework/guards";
import _ from "lodash";
import { MaterialKindService } from "../services";
@Controller("api/materialKind")
// @UseGuards(LoginGuard)
export class MaterialKindController {
  constructor(private readonly materialKindServices: MaterialKindService) {}

  @Get("/getAllMaterialKinds")
  // @Roles(1)
  public async getMaterialKind() {
    return this.materialKindServices.getAllMaterialKinds();
  }

  @Post("/saveMaterialKind")
  // @Roles(1)
  public async createMaterialKind(@Body() data: any) {
    return this.materialKindServices.saveMaterialKind(data);
  }

  @Post("/updateMaterialKind/:id")
  // @Roles(1)
  public async updateMaterialKind(
    @Param("id") materialKindId: any,
    @Body() data: any,
  ) {
    return this.materialKindServices.updateMaterialKind(materialKindId, data);
  }

  // @Post("/deleteMaterialKind/:id")
  // // @Roles(1)
  // public async deleteMaterialKind(@Param("id") materialKindId: any) {
  //   return this.materialKindServices.deleteMaterialKind(materialKindId);
  // }
}
