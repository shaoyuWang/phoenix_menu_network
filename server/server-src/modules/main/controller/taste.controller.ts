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
import { TasteService } from "../services/taste.service";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";

@Controller("taste")
@UseGuards(LoginGuard)
export class TasteController {
  constructor(private readonly tasteServices: TasteService) {}

  @Get("/getAllTastes")
  @Roles(1, 2)
  public async getTastes() {
    return this.tasteServices.getAllTastes();
  }

  //   @Get("/findTasteById/:id")
  //   @Roles(1, 2)
  //   public async findTasteById(@Param("id") tasteId: any) {
  //     if (!_.isEmpty(tasteId)) {
  //       return this.tasteServices.findTasteById(tasteId);
  //     } else {
  //       return { code: 500 };
  //     }
  //   }

  @Post("/saveTaste")
  @Roles(1, 2)
  public async saveTaste(@Body() data: any) {
    if (!_.isEmpty(data)) {
      return this.tasteServices.saveTaste(data);
    } else {
      return { code: RESPONSE_CODE.NOTPARAMETER };
    }
  }

  @Put("/updateTaste/:id")
  @Roles(1)
  public async updateTaste(@Param("id") tasteId: any, @Body() data: any) {
    if (!_.isEmpty(tasteId) && !_.isEmpty(data)) {
      return this.tasteServices.updateTaste(tasteId, data);
    } else {
      return { code: RESPONSE_CODE.NOTPARAMETER };
    }
  }
}
