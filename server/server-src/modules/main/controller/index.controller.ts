import { Controller, Get, UseGuards } from "@nestjs/common";
import { Roles } from "../../../framework/decorators/role.decorator";
import { LoginGuard } from "../../../framework/guards";
import _ from "lodash";
import { IndexService } from "../services";

@Controller("/main/index")
// @UseGuards(LoginGuard)
export class IndexController {
  constructor(private readonly indexService: IndexService) {}

  @Get("/getList")
  public async getList() {
    return await this.indexService.getList();
  }
}
