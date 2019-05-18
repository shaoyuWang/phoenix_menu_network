import { Controller, Get, UseGuards } from "@nestjs/common";
import { Roles } from "../../../framework/decorators/role.decorator";
import { LoginGuard } from "../../../framework/guards";
import { RESPONSE_CODE } from "../../../framework/enums";
import _ from "lodash";
import { UserService, UserDiaryService } from "../../admin/services";
import { GoumetMasterService } from "../services";

@Controller("/main/goumetMaster")
@UseGuards(LoginGuard)
export class GoumetMasterController {
  constructor(private readonly goumetMasterService: GoumetMasterService) {}

  @Get("/getList")
  @Roles(2)
  public async getList() {
    let data = await this.goumetMasterService.getList();
    return { data, code: RESPONSE_CODE.SUCCESS };
  }
}
