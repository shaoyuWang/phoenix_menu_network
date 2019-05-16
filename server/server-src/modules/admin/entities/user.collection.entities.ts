import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { FrameworkEntity } from "../../../framework/entities/freamework.entities";
import { UserEntity } from "./user.entities";
import { RecipeEntity } from "../../main/entities";

@Entity({ name: "s_user_collection" })
export class UserCollectionEntity extends FrameworkEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "user_id" })
  public user: UserEntity | null;

  @ManyToOne(() => RecipeEntity)
  @JoinColumn({ name: "recipe_id" })
  public recipe: RecipeEntity | null;
}
