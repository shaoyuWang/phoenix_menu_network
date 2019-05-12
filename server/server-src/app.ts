import dotenv from "dotenv";
dotenv.config();

import { NestFactory } from "@nestjs/core";
import cookie from "cookie-parser";
import session from "express-session";
import passport = require("passport");
import { AppModule } from "./app.module";

const {
  env: { PORT },
} = process;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookie("secret"));
  app.use(session({ secret: "secret" }));
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(Number(PORT));
}
bootstrap();
