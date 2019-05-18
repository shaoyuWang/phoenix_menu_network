import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { FrameworkEntity } from "../../../framework/entities/freamework.entities";
import { UserEntity } from "../../admin/entities";

@Entity({ name: "m_recipe_video" })
export class RecipeVideoEntity extends FrameworkEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: "name", length: 100 })
  public name: string;

  @Column({ name: "video" })
  public video: string;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => UserEntity)
  public user: UserEntity;
}
