import { Module } from "@nestjs/common";
import { UploadController } from "./upload/upload.controller";

const controllers = [UploadController];

const services = [];

@Module({
  controllers: controllers,
  providers: services,
})
export class coreModule {}
