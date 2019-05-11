import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RoleEntity } from "./role.etities";

@Entity({ name: "Users" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: "user_name", length: 100 })
  public userName: string;

  @Column({ length: 100 })
  public password: string;

  @ManyToMany(() => RoleEntity)
  @JoinTable({
    inverseJoinColumn: { name: "role_id" },
    joinColumn: { name: "user_id" },
    name: "user-role-mapping",
  })
  public roles: RoleEntity[];
}
