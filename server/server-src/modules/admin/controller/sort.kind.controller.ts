import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Roles } from "../../../framework/decorators/role.decorator";
import { LoginGuard } from "../../../framework/guards";
import _ from "lodash";
import { SortKindService } from "../services";
@Controller("api/sortKind")
// @UseGuards(LoginGuard)
export class SortKindController {
  constructor(private readonly sortKindServices: SortKindService) {}

  @Get("/getAllSortKinds")
  // @Roles(1)
  public async getSortKind() {
    return this.sortKindServices.getAllSortKinds();
  }

  @Post("/saveSortKind")
  // @Roles(1)
  public async createSortKind(@Body() data: any) {
    return this.sortKindServices.saveSortKind(data);
  }

  @Post("/updateSortKind/:id")
  // @Roles(1)
  public async updateSortKind(@Param("id") sortKindId: any, @Body() data: any) {
    return this.sortKindServices.updateSortKind(sortKindId, data);
  }

  // @Post("/deleteSortKind/:id")
  // // @Roles(1)
  // public async deleteSortKind(@Param("id") sortKindId: any) {
  //   return this.sortKindServices.deleteSortKind(sortKindId);
  // }
}
