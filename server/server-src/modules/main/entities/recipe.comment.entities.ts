import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { FrameworkEntity } from "../../../framework/entities/freamework.entities";
import { RecipeEntity } from "./recipe.entities";
import { UserEntity } from "../../admin/entities";

@Entity({ name: "m_recipe_comment" })
export class RecipeCommentEntity extends FrameworkEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("text", { name: "comment" })
  public comment: string;

  @Column({ name: "praise" })
  public praise: number;

  @JoinColumn({ name: "recipe_id" })
  @ManyToOne(() => RecipeEntity)
  public recipeId: RecipeEntity | null;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => UserEntity)
  public user: UserEntity | null;
}
