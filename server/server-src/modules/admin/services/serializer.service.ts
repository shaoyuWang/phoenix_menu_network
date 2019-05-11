import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";

@Injectable()
export class SerializerService extends PassportSerializer {
  public serializeUser(user: any, next: Function) {
    next(null, user);
  }

  public deserializeUser(user: any, next: Function) {
    next(null, user);
  }
}
