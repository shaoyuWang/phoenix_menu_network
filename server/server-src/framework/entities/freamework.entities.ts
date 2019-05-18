import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class FrameworkEntity {
  @CreateDateColumn({ name: "create_date" })
  public createDate: Date;

  @UpdateDateColumn({ name: "update_date" })
  public updateDate: Date;
}
