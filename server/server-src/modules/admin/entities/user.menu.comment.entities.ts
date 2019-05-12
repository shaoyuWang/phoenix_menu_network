import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { FrameworkEntity } from "../../../framework/entities/freamework.entities";
import { UserEntity } from "./user.entities";
import { UserMenuEntity } from "./user.menu.entities";

@Entity({ name: "s_user_menu_comment" })
export class UserMenuCommentEntity extends FrameworkEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("text", { name: "comment" })
  public comment: string;

  @Column({ name: "praise" })
  public praise: number;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => UserEntity)
  public user: UserEntity | null;

  @JoinColumn({ name: "menu_id" })
  @ManyToOne(() => UserMenuEntity)
  public menu: UserMenuEntity | null;
}
