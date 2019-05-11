import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { FrameworkEntity } from "../../../framework/entities/freamework.entities";

@Entity({ name: "s_role" })
export class RoleEntity extends FrameworkEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: "name", length: 100 })
  public name: string;

  @Column("varchar", { name: "description", nullable: true, length: 100 })
  public description: string | null;
}
