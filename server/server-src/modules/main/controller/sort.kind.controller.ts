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
import { SortKindService } from "../services/sort.kind.service";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";

@Controller("sortKind")
@UseGuards(LoginGuard)
export class SortKindController {
  constructor(private readonly sortKindServices: SortKindService) {}

  @Get("/getAllKinds")
  @Roles(1, 2)
  public async getSortKinds() {
    return this.sortKindServices.getAllKinds();
  }

  //   @Get("/findSortKindById/:id")
  //   @Roles(1, 2)
  //   public async findSortKindById(@Param("id") sortKindId: any) {
  //     if (!_.isEmpty(sortKindId)) {
  //       return this.sortKindServices.findSortKindById(sortKindId);
  //     } else {
  //       return { code: 500 };
  //     }
  //   }

  @Post("/saveKind")
  @Roles(1, 2)
  public async saveSortKind(@Body() data: any) {
    if (!_.isEmpty(data)) {
      return this.sortKindServices.saveKind(data);
    } else {
      return { code: RESPONSE_CODE.NOTPARAMETER };
    }
  }

  @Put("/updateKind/:id")
  @Roles(1)
  public async updateSortKind(@Param("id") sortKindId: any, @Body() data: any) {
    if (!_.isEmpty(sortKindId) && !_.isEmpty(data)) {
      return this.sortKindServices.updateKind(sortKindId, data);
    } else {
      return { code: RESPONSE_CODE.NOTPARAMETER };
    }
  }
}
