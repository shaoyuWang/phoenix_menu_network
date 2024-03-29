import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { FrameworkEntity } from "../../../framework/entities/freamework.entities";
import { RecipeEntity } from "./recipe.entities";

@Entity({ name: "m_major_recipe_material" })
export class MajorRecipeMaterialEntity extends FrameworkEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: "material_id" })
  public materialId: number;

  @Column({ name: "name", length: 100 })
  public name: string;

  @Column({ name: "quality", length: 100 })
  public quality: string;

  @Column({ name: "photo", length: 255 })
  public photo: string;

  @JoinColumn({ name: "recipe_id" })
  @ManyToOne(() => RecipeEntity)
  public recipe: number;
}
