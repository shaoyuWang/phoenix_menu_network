import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { FrameworkEntity } from "../../../framework/entities/freamework.entities";
import { RecipeEntity } from "./recipe.entities";

@Entity({ name: "m_step" })
export class StepEntity extends FrameworkEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("text", { name: "info" })
  public info: string;

  @Column({ name: "step" })
  public step: number;

  @Column({ name: "photo", length: 255 })
  public photo: string;

  @ManyToOne(() => RecipeEntity)
  public recipe: RecipeEntity | null;
}
