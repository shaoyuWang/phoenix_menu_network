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
import { EffectService } from "../services/effect.service";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";

@Controller("effect")
@UseGuards(LoginGuard)
export class EffectController {
  constructor(private readonly effectServices: EffectService) {}

  @Get("/getAllEffects")
  @Roles(1, 2)
  public async getEffects() {
    return this.effectServices.getAllEffects();
  }

  //   @Get("/findEffectById/:id")
  //   @Roles(1, 2)
  //   public async findEffectById(@Param("id") effectId: any) {
  //     if (!_.isEmpty(effectId)) {
  //       return this.effectServices.findEffectById(effectId);
  //     } else {
  //       return { code: 500 };
  //     }
  //   }

  @Post("/saveEffect")
  @Roles(1, 2)
  public async saveEffect(@Body() data: any) {
    if (!_.isEmpty(data)) {
      return this.effectServices.saveEffect(data);
    } else {
      return { code: RESPONSE_CODE.NOTPARAMETER };
    }
  }

  @Put("/updateEffect/:id")
  @Roles(1)
  public async updateEffect(@Param("id") effectId: any, @Body() data: any) {
    if (!_.isEmpty(effectId) && !_.isEmpty(data)) {
      return this.effectServices.updateEffect(effectId, data);
    } else {
      return { code: RESPONSE_CODE.NOTPARAMETER };
    }
  }
}
