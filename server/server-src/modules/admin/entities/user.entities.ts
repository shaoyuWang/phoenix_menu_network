import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RoleEntity } from "./role.entities";
import { FrameworkEntity } from "../../../framework/entities/freamework.entities";

@Entity({ name: "s_user" })
export class UserEntity extends FrameworkEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: "username", length: 100 })
  public username: string;

  @Column({ name: "password", length: 100 })
  public password: string;

  @Column({ name: "name", length: 255 })
  public name: string;

  @Column({ name: "email", length: 100 })
  public email: string;

  @Column("varchar", { name: "phone", nullable: true, length: 100 })
  public phone: string | null;

  @Column({ name: "collection_number" })
  public collectionNumber: number;

  @Column({ name: "menu_number" })
  public menuNumber: number;

  @Column("varchar", { name: "photo", nullable: true, length: 11 })
  public photo: string | null;

  @ManyToMany(() => RoleEntity)
  @JoinTable({
    inverseJoinColumn: { name: "role_id" },
    joinColumn: { name: "user_id" },
    name: "s_user_role_mapping",
  })
  public roles: RoleEntity[];
}