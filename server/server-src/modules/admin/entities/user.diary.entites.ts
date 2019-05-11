import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { FrameworkEntity } from "../../../framework/entities/freamework.entities";
import { UserEntity } from "./user.entities";

@Entity({ name: "s_user_diary" })
export class UserDiaryEntity extends FrameworkEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: "title", length: 255 })
  public title: string;

  @Column("text", { name: "info" })
  public info: string;

  @Column({ name: "comment_number" })
  public commentNumber: number;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => UserEntity)
  public userId: UserEntity | null;
}
