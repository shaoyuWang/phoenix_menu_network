import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { FrameworkEntity } from "../../../framework/entities/freamework.entities";
import { RecipeEntity } from "./recipe.entities";
import { MaterialEntity } from "./material.entities";

@Entity({ name: "m_major_recipe_material_mapping" })
export class MajorRecipeMaterialMappingEntity extends FrameworkEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @JoinColumn({ name: "recipe_id" })
  @OneToOne(() => RecipeEntity)
  public recipeId: number;

  @JoinColumn({ name: "material_id" })
  @OneToOne(() => MaterialEntity)
  public materialId: number;

  @Column({ name: "quality", length: 100 })
  public quality: string;
}
