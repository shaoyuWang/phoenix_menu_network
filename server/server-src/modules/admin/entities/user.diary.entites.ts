import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from "typeorm";
import { FrameworkEntity } from "../../../framework/entities/freamework.entities";
import { UserEntity } from "./user.entities";
import { UserDiaryCommentEntity } from "./user.diary.comment.entities";

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
  @OneToOne(() => UserEntity)
  public userId: UserEntity | null;
}
