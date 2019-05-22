import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Roles } from "../../../framework/decorators/role.decorator";
import { LoginGuard } from "../../../framework/guards";
import _ from "lodash";
import { SortService } from "../services/sort.service";
@Controller("api/sort")
// @UseGuards(LoginGuard)
export class SortController {
  constructor(private readonly sortServices: SortService) {}

  @Get("/getAllSorts")
  // @Roles(1)
  public async getAllSorts() {
    return this.sortServices.getAllSorts();
  }

  @Get("/getAllSortKinds")
  // @Roles(1)
  public async getAllSortKinds() {
    return this.sortServices.getAllSortKinds();
  }

  @Post("/saveSort")
  // @Roles(1)
  public async createSort(@Body() data: any) {
    return this.sortServices.saveSort(data);
  }

  @Post("/updateSort/:id")
  // @Roles(1)
  public async updateSort(@Param("id") sortId: any, @Body() data: any) {
    return this.sortServices.updateSort(sortId, data);
  }

  // @Post("/deleteSort/:id")
  // // @Roles(1)
  // public async deleteSort(@Param("id") sortId: any) {
  //   return this.sortServices.deleteSort(sortId);
  // }
}
