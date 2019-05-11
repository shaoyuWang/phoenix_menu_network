import { Controller, Post, Request, Response } from "@nestjs/common";
import passport from "passport";

@Controller()
export class AuthorityController {
  @Post("login")
  public login(@Request() request: any, @Response() response: any) {
    passport.authenticate("local")(request, response, () => {
      response.send(request.user);
    });
  }

  @Post("logout")
  public logout(@Request() request: any) {
    request.logout();
    return "logout";
  }
}
