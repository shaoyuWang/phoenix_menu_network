import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { FrameworkEntity } from "../../../framework/entities/freamework.entities";
import { UserMenuEntity } from "./user.menu.entities";

@Entity({ name: "s_user_menu_comment" })
export class UserMenuCommentEntity extends FrameworkEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("text", { name: "comment" })
  public comment: string;

  @Column({ name: "praise" })
  public praise: number;

  @Column({ name: "user_id" })
  public userId: number;

  @Column({ name: "user_name" })
  public username: string;

  @JoinColumn({ name: "menu_id" })
  @ManyToOne(() => UserMenuEntity)
  public menu: UserMenuEntity | null;
}
