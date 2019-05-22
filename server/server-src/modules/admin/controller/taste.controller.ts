import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Roles } from "../../../framework/decorators/role.decorator";
import { LoginGuard } from "../../../framework/guards";
import _ from "lodash";
import { TasteService } from "../services/taste.service";
@Controller("api/taste")
// @UseGuards(LoginGuard)
export class TasteController {
  constructor(private readonly tasteServices: TasteService) {}

  @Get("/getAllTastes")
  // @Roles(1)
  public async getTaste() {
    return this.tasteServices.getAllTastes();
  }

  @Post("/saveTaste")
  // @Roles(1)
  public async createTaste(@Body() data: any) {
    return this.tasteServices.saveTaste(data);
  }

  @Post("/updateTaste/:id")
  // @Roles(1)
  public async updateTaste(@Param("id") tasteId: any, @Body() data: any) {
    return this.tasteServices.updateTaste(tasteId, data);
  }

  // @Post("/deleteTaste/:id")
  // // @Roles(1)
  // public async deleteTaste(@Param("id") tasteId: any) {
  //   return this.tasteServices.deleteTaste(tasteId);
  // }
}
