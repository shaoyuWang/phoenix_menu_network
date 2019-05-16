import { Controller, Get, UseGuards } from "@nestjs/common";
import { Roles } from "../../../framework/decorators/role.decorator";
import { LoginGuard } from "../../../framework/guards";
import { RESPONSE_CODE } from "../../../framework/enums";
import { RecipeService } from "../services";
import _ from "lodash";
import { UserService, UserDiaryService } from "../../admin/services";

@Controller("/main/goumetMaster")
@UseGuards(LoginGuard)
export class GoumetMasterController {
  constructor(
    private readonly userService: UserService,
    private readonly userDiaryService: UserDiaryService,
  ) {}

  @Get("/getList")
  @Roles(2)
  public async getList() {
    let data: any;
    data.users = await this.userService.getAllUsers();
    data.diaries = await this.userDiaryService.getAllDiarys();
    return { data, code: RESPONSE_CODE.SUCCESS };
  }
}
