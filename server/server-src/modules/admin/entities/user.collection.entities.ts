import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from "typeorm";
import { FrameworkEntity } from "../../../framework/entities/freamework.entities";
import { UserEntity } from "./user.entities";
import { RecipeEntity } from "../../main/entities";

@Entity({ name: "s_user_collection" })
export class UserCollectionEntity extends FrameworkEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: "recipe_id" })
  public recipeId: number;

  @Column({ name: "recipe_name" })
  public recipeName: string;

  @Column({ name: "recipe_finish_photo", length: 255 })
  public recipeFinishPhoto: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "user_id" })
  public user: UserEntity | null;
}
