import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
} from "typeorm";
import { FrameworkEntity } from "../../../framework/entities/freamework.entities";
import { RecipeEntity } from "../../main/entities";

@Entity({ name: "s_user_menu" })
export class UserMenuEntity extends FrameworkEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: "name", length: 100 })
  public name: string;

  @Column({ name: "collection_number" })
  public collectionNumber: number;

  @Column({ name: "vistor" })
  public vistor: number;

  @ManyToMany(() => RecipeEntity)
  @JoinTable({
    inverseJoinColumn: { name: "recipe_id" },
    joinColumn: { name: "menu_id" },
    name: "s_menu_recipe_mapping",
  })
  public roles: RecipeEntity[];
}
