import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Roles } from "../../../framework/decorators/role.decorator";
import { LoginGuard } from "../../../framework/guards";
import { EffectService } from "../services";
import _ from "lodash";

@Controller("api/effect")
// @UseGuards(LoginGuard)
export class EffectController {
  constructor(private readonly effectServices: EffectService) {}

  @Get("/getAllEffects")
  // @Roles(1)
  public async getEffects() {
    return this.effectServices.getAllEffects();
  }

  @Post("/saveEffect")
  // @Roles(1)
  public async createEffect(@Body() data: any) {
    return this.effectServices.saveEffect(data);
  }

  @Post("/updateEffect/:id")
  // @Roles(1)
  public async updateEffect(@Param("id") effectId: any, @Body() data: any) {
    return this.effectServices.updateEffect(effectId, data);
  }

  // @Post("/deleteEffect/:id")
  // // @Roles(1)
  // public async deleteEffect(@Param("id") effectId: any) {
  //   return this.effectServices.deleteEffect(effectId);
  // }
}
