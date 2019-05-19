import {
  Controller,
  UseGuards,
  Post,
  UseInterceptors,
  FileInterceptor,
  Body,
  UploadedFile,
} from "@nestjs/common";
import { Roles } from "../../../framework/decorators/role.decorator";
import { LoginGuard } from "../../../framework/guards";
import _ from "lodash";
import { createWriteStream } from "fs";
import { join } from "path";
import { RESPONSE_CODE } from "../../enums";

@Controller("/upload")
// @UseGuards(LoginGuard)
export class UploadController {
  constructor() {}

  @Post("/img")
  @UseInterceptors(FileInterceptor("file"))
  // @Roles(2)
  public async uploadImg(@UploadedFile() file) {
    const nameList = _.split(file.originalname, ".");
    if (
      _.toLower(nameList[nameList.length - 1]) == "jpg" ||
      _.toLower(nameList[nameList.length - 1]) == "jpeg"
    ) {
      const random = _.random(100000, 999999);
      const fileName = `${random}${new Date().getTime()}.${
        nameList[nameList.length - 1]
      }`;
      const writeImage = createWriteStream(
        join(__dirname, "../../../assets/imgs", `${fileName}`),
      );
      writeImage.write(file.buffer);
      return { writeImage, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTPARAMETER };
    }
  }
}
