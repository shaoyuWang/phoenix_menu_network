import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { FrameworkEntity } from "../../../framework/entities/freamework.entities";
import { UserEntity } from "./user.entities";
import { UserDiaryCommentEntity } from "./user.diary.comment.entities";

@Entity({ name: "s_user_diary" })
export class UserDiaryEntity extends FrameworkEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: "title", length: 150 })
  public title: string;

  @Column("text", { name: "info" })
  public info: string;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => UserEntity)
  public user: UserEntity | null;

  @OneToMany(
    () => UserDiaryCommentEntity,
    (UserDiaryCommentEntity) => UserDiaryCommentEntity.diary,
  )
  public comments: UserDiaryCommentEntity[] | null;
}
