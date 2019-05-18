import { Controller, Get, UseGuards } from "@nestjs/common";
import { Roles } from "../../../framework/decorators/role.decorator";
import { LoginGuard } from "../../../framework/guards";
import _ from "lodash";
import { GoumetMasterService } from "../services";

@Controller("/main/goumetMaster")
// @UseGuards(LoginGuard)
export class GoumetMasterController {
  constructor(private readonly goumetMasterService: GoumetMasterService) {}

  @Get("/getList")
  // @Roles(2)
  public async getList() {
    return await this.goumetMasterService.getList();
  }
}
