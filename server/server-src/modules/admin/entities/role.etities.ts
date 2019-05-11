import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Roles" })
export class RoleEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 100 })
  public name: string;

  @Column({ length: 100 })
  public comment: string;
}
