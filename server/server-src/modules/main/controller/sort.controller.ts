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
import { SortService } from "../services/sort.service";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";

@Controller("sort")
@UseGuards(LoginGuard)
export class SortController {
  constructor(private readonly sortServices: SortService) {}

  @Get("/getAllSorts")
  @Roles(1, 2)
  public async getSorts() {
    return this.sortServices.getAllSorts();
  }

  //   @Get("/findSortById/:id")
  //   @Roles(1, 2)
  //   public async findSortById(@Param("id") sortId: any) {
  //     if (!_.isEmpty(sortId)) {
  //       return this.sortServices.findSortById(sortId);
  //     } else {
  //       return { code: 500 };
  //     }
  //   }

  @Post("/saveSort")
  @Roles(1, 2)
  public async saveSort(@Body() data: any) {
    if (!_.isEmpty(data)) {
      return this.sortServices.saveSort(data);
    } else {
      return { code: RESPONSE_CODE.NOTPARAMETER };
    }
  }

  @Put("/updateSort/:id")
  @Roles(1)
  public async updateSort(@Param("id") sortId: any, @Body() data: any) {
    if (!_.isEmpty(sortId) && !_.isEmpty(data)) {
      return this.sortServices.updateSort(sortId, data);
    } else {
      return { code: RESPONSE_CODE.NOTPARAMETER };
    }
  }
}
