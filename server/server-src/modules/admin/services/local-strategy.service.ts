import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy } from "passport-local";
import { Repository } from "typeorm";
import { UserEntity } from "../entities";

@Injectable()
export class LocalStrategyService extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super();
  }

  public async validate(username: string, password: string, next: Function) {
    const user = await this.userRepository.findOne({
      relations: ["roles"],
      where: {
        username,
        password,
      },
    });
    next(null, user);
  }
}
