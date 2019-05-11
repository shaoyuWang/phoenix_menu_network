import { Module } from "@nestjs/common";

const controllers = [];

const services = [];

@Module({
  controllers: controllers,
  providers: services,
})
export class mainModule {}
