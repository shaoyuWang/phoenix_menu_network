import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
  JoinTable,
  ManyToMany,
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
import { RecipeCommentEntity } from "./recipe.comment.entities";

@Entity({ name: "m_recipe" })
export class RecipeEntity extends FrameworkEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("varchar", { name: "name" })
  public name: string;

  @Column({ name: "level" })
  public level: number;

  @Column({ name: "time" })
  public time: number;

  @Column({ name: "time_type" })
  public timeType: number;

  @Column({ name: "evaluate", length: 100 })
  public evaluate: string;

  @Column({ name: "finishPhoto", length: 255 })
  public finishPhoto: string;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => UserEntity)
  public user: UserEntity | null;

  @JoinColumn({ name: "sort_id" })
  @ManyToOne(() => SortEntity)
  public sort: SortEntity | null;

  @JoinColumn({ name: "technology_id" })
  @ManyToOne(() => TechnologyEntity)
  public technology: TechnologyEntity | null;

  @JoinColumn({ name: "taste_id" })
  @ManyToOne(() => TasteEntity)
  public taste: TasteEntity | null;

  @OneToMany(() => StepEntity, (StepEntity) => StepEntity.recipe)
  public steps: StepEntity[] | null;

  @OneToMany(
    () => MajorRecipeMaterialMappingEntity,
    (MajorRecipeMaterialMappingEntity) =>
      MajorRecipeMaterialMappingEntity.recipe,
  )
  public majorMaterials: MajorRecipeMaterialMappingEntity | null;

  @OneToMany(
    () => AuxiliaryRecipeMaterialMappingEntity,
    (AuxiliaryRecipeMaterialMappingEntity) =>
      AuxiliaryRecipeMaterialMappingEntity.recipe,
  )
  public auxiliaryMaterials: AuxiliaryRecipeMaterialMappingEntity | null;

  @ManyToMany(() => EffectEntity)
  @JoinTable({
    inverseJoinColumn: { name: "effect_id" },
    joinColumn: { name: "recipe_id" },
    name: "m_recipe_effect_mapping",
  })
  public effects: EffectEntity[] | null;

  @OneToMany(
    () => RecipeCommentEntity,
    (RecipeCommentEntity) => RecipeCommentEntity.recipe,
  )
  public comments: RecipeCommentEntity | null;
}
