import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { FrameworkEntity } from "../../../framework/entities/freamework.entities";
import { RecipeEntity } from "./recipe.entities";

@Entity({ name: "m_auxiliary_recipe_material" })
export class AuxiliaryRecipeMaterialMappingEntity extends FrameworkEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: "material_id" })
  public materialId: number;

  @Column({ name: "name", length: 100 })
  public name: string;

  @Column({ name: "quality", length: 100 })
  public quality: string;

  @JoinColumn({ name: "recipe_id" })
  @ManyToOne(() => RecipeEntity)
  public recipe: number;
}
