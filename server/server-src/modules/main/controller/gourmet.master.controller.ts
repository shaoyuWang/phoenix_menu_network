import { Controller, Get, UseGuards } from "@nestjs/common";
import { Roles } from "../../../framework/decorators/role.decorator";
import { LoginGuard } from "../../../framework/guards";
import _ from "lodash";
import { GourmetMasterService } from "../services";

@Controller("/main/gourmetMaster")
// @UseGuards(LoginGuard)
export class GourmetMasterController {
  constructor(private readonly gourmetMasterService: GourmetMasterService) {}

  @Get("/getList")
  // @Roles(2)
  public async getList() {
    return await this.gourmetMasterService.getList();
  }
}
