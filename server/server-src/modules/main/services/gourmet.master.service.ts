import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import _ from "lodash";
import { RESPONSE_CODE } from "../../../framework/enums";
import { UserDiaryEntity } from "../../admin/entities";

@Injectable()
export class GourmetMasterService {
  constructor(
    @InjectRepository(UserDiaryEntity)
    private readonly userDiaryRepository: Repository<UserDiaryEntity>,
  ) {}

  //   获取列表
  public async getList() {
    let data: any;
    let diarys = await this.userDiaryRepository.find({ relations: ["user"] });
    data = _.assign({}, { diarys });
    if (!_.isEmpty(data)) {
      return { data: data, code: RESPONSE_CODE.SUCCESS };
    } else {
      return { code: RESPONSE_CODE.NOTVALUE };
    }
  }
}
