import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from "typeorm";
import { FrameworkEntity } from "../../../framework/entities/freamework.entities";
import { RecipeEntity } from "./recipe.entities";
import { MaterialEntity } from "./material.entities";

@Entity({ name: "m_auxiliary_recipe_material_mapping" })
export class AuxiliaryRecipeMaterialMappingEntity extends FrameworkEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @JoinColumn({ name: "recipe_id" })
  @Column({ name: "recipe_id" })
  @OneToOne(() => RecipeEntity)
  public recipeId: number;

  @JoinColumn({ name: "material_id" })
  @Column({ name: "material_id" })
  @OneToOne(() => MaterialEntity)
  public materialId: number;

  @Column({ name: "quality", length: 100 })
  public quality: string;
}
