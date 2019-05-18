import { Controller, Get, UseGuards } from "@nestjs/common";
import { Roles } from "../../../framework/decorators/role.decorator";
import { LoginGuard } from "../../../framework/guards";
import { RESPONSE_CODE } from "../../../framework/enums";
import _ from "lodash";
import { IndexService } from "../services";

@Controller("/main/index")
// @UseGuards(LoginGuard)
export class IndexController {
  constructor(private readonly indexService: IndexService) {}

  @Get("/getList")
  // @Roles(2)
  public async getList() {
    return await this.indexService.getList();
  }
}
