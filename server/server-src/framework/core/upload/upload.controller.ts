import {
  Controller,
  UseGuards,
  Post,
  UseInterceptors,
  FileInterceptor,
  UploadedFile,
} from "@nestjs/common";
import { Roles } from "../../../framework/decorators/role.decorator";
import { LoginGuard } from "../../../framework/guards";
import _ from "lodash";
import { createWriteStream } from "fs";
import { join } from "path";
import { RESPONSE_CODE } from "../../enums";

@Controller("upload")
// @UseGuards(LoginGuard)
export class UploadController {
  constructor() {}

  @Post("/img")
  @UseInterceptors(FileInterceptor("file"))
  // @Roles(2)
  public async uploadImg(@UploadedFile() file: any) {
    const nameList = _.split(file.originalname, ".");
    const random = _.random(100000, 999999);
    const fileName = `${random}${new Date().getTime()}.${
      nameList[nameList.length - 1]
    }`;
    let writeImage = createWriteStream(
      join(
        "/Users/wangshaoyu/Desktop/Graduation design/phoenix_menu_network/client/src/assets/imgs",
        `${fileName}`,
      ),
    );
    writeImage.write(file.buffer);
    return { data: writeImage.path, code: RESPONSE_CODE.SUCCESS };
  }

  @Post("/video")
  @UseInterceptors(FileInterceptor("file"))
  // @Roles(2)
  public async uploadVideo(@UploadedFile() file: any) {
    const nameList = _.split(file.originalname, ".");
    if (_.toLower(nameList[nameList.length - 1]) == "mp4") {
      return { code: RESPONSE_CODE.NOTPARAMETER };
    }
    const random = _.random(100000, 999999);
    const fileName = `${random}${new Date().getTime()}.${
      nameList[nameList.length - 1]
    }`;
    let writeImage = createWriteStream(
      join(
        "/Users/wangshaoyu/Desktop/Graduation design/phoenix_menu_network/client/src/assets/videos",
        `${fileName}`,
      ),
    );
    writeImage.write(file.buffer);
    return { writeImage, code: RESPONSE_CODE.SUCCESS };
  }
}
