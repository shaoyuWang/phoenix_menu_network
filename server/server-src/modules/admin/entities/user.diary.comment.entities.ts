import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from "typeorm";
import { FrameworkEntity } from "../../../framework/entities/freamework.entities";
import { UserDiaryEntity } from "./user.diary.entites";

@Entity({ name: "s_user_diary_comment" })
export class UserDiaryCommentEntity extends FrameworkEntity {
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

  @JoinColumn({ name: "diary_id" })
  @ManyToOne(() => UserDiaryEntity)
  public diary: UserDiaryEntity | null;
}
