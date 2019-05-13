import { Controller, Post, Request, Response } from "@nestjs/common";
import passport from "passport";
import _ from "lodash";

@Controller("/auth")
export class AuthorityController {
  @Post("/login")
  public login(@Request() request: any, @Response() response: any) {
    passport.authenticate("local")(request, response, () => {
      if (!_.isEmpty(request.user)) {
        response.send(request.user);
      } else {
        response.send("200");
      }
    });
  }

  @Post("/logout")
  public logout(@Request() request: any) {
    request.logout();
    return "logout";
  }
}
