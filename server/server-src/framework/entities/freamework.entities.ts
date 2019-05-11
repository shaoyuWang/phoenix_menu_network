import { Column } from "typeorm";

export abstract class FrameworkEntity {
  @Column("datetime", { name: "create_date", nullable: true })
  public createDate: Date;

  @Column("datetime", { name: "update_date", nullable: true })
  public updateDate: Date;
}
