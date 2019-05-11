import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
  JoinTable,
  ManyToMany,
  OneToOne,
} from "typeorm";
import { FrameworkEntity } from "../../../framework/entities/freamework.entities";
import { UserEntity } from "../../admin/entities";
import { SortEntity } from "./sort.entities";
import { TechnologyEntity } from "./technology.entities";
import { TasteEntity } from "./taste.entities";
import { MajorRecipeMaterialMappingEntity } from "./major.recipe.material.entities";
import { AuxiliaryRecipeMaterialMappingEntity } from "./auxiliary.recipe.material.entities";
import { EffectEntity } from "./effect.entities";
import { StepEntity } from "./step.entities";

@Entity({ name: "m_recipe" })
export class RecipeEntity extends FrameworkEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("varchar", { name: "name" })
  public name: string;

  @Column({ name: "level", length: 100 })
  public level: string;

  @Column({ name: "time", length: 100 })
  public time: string;

  @Column("text", { name: "evaluate" })
  public evaluate: string;

  @Column({ name: "finishPhoto" })
  public finishPhoto: string;

  @JoinColumn({ name: "user_id" })
  @OneToOne(() => UserEntity)
  public userId: UserEntity | null;

  @JoinColumn({ name: "sort_id" })
  @OneToOne(() => SortEntity)
  public sortId: SortEntity | null;

  @JoinColumn({ name: "technology_id" })
  @OneToOne(() => TechnologyEntity)
  public technologyId: TechnologyEntity | null;

  @JoinColumn({ name: "taste_id" })
  @OneToOne(() => TasteEntity)
  public tasteId: TasteEntity | null;

  @JoinColumn({ name: "step_id" })
  @OneToMany(() => StepEntity, (StepEntity) => StepEntity.recipeId)
  public steps: StepEntity[] | null;

  @JoinColumn({ name: "major_material_id" })
  @ManyToOne(() => MajorRecipeMaterialMappingEntity)
  public majorMaterials: MajorRecipeMaterialMappingEntity | null;

  @JoinColumn({ name: "auxiliary_material_id" })
  @ManyToOne(() => AuxiliaryRecipeMaterialMappingEntity)
  public auxiliaryMaterials: AuxiliaryRecipeMaterialMappingEntity | null;

  @ManyToMany(() => EffectEntity)
  @JoinTable({
    inverseJoinColumn: { name: "effect_id" },
    joinColumn: { name: "recipe_id" },
    name: "m_recipe_effect_mapping",
  })
  public roles: EffectEntity[];
}