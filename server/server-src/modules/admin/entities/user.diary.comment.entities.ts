import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from "typeorm";
import { FrameworkEntity } from "../../../framework/entities/freamework.entities";
import { UserEntity } from "./user.entities";
import { UserDiaryEntity } from "./user.diary.entites";

@Entity({ name: "s_user_diary_comment" })
export class UserDiaryCommentEntity extends FrameworkEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("text", { name: "comment" })
  public comment: string;

  @Column({ name: "praise" })
  public praise: number;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => UserEntity)
  public user: UserEntity | null;

  @JoinColumn({ name: "diary_id" })
  @ManyToOne(() => UserDiaryEntity)
  public diary: UserDiaryEntity | null;
}
