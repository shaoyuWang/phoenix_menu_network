import { Controller, Get, UseGuards, Param } from "@nestjs/common";
import { Roles } from "../../../framework/decorators/role.decorator";
import { LoginGuard } from "../../../framework/guards";
import _ from "lodash";
import { AllTemplateService } from "../services/all.template.service";

@Controller("/main/allTemplate")
// @UseGuards(LoginGuard)
export class AllTemplateController {
  constructor(private readonly allTemplateService: AllTemplateService) {}

  @Get("/getList/:status")
  public async getList(@Param("status") status: any) {
    return await this.allTemplateService.getList(status);
  }
}
