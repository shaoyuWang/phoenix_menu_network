import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { FrameworkEntity } from "../../../framework/entities/freamework.entities";
import { RecipeEntity } from "./recipe.entities";

@Entity({ name: "m_recipe_comment" })
export class RecipeCommentEntity extends FrameworkEntity {
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

  @JoinColumn({ name: "recipe_id" })
  @ManyToOne(() => RecipeEntity)
  public recipe: RecipeEntity | null;
}
