import dotenv from "dotenv";
dotenv.config();

import { NestFactory } from "@nestjs/core";
import cookie from "cookie-parser";
import session from "express-session";
import passport = require("passport");
import { AppModule } from "./app.module";
import cors from "cors";

const {
  env: { PORT },
} = process;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 解决跨域问题
  // app.use(
  //   cors({
  //     // origin: "http://localhost:8080",
  //     origin: ["http://localhost:8080"],
  //     methods: ["GET", "POST", "PUT", "DELETE"],
  //     alloweHeaders: ["Conten-Type", "Authorization"],
  //     credentials: true,
  //     optionsSuccessStatus: 200,
  //   }),
  // );

  app.use(cookie("secret"));
  app.use(session({ secret: "secret" }));
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(Number(PORT));
}
bootstrap();
