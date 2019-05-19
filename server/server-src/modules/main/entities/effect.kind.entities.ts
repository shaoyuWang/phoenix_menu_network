import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { FrameworkEntity } from "../../../framework/entities/freamework.entities";
import { EffectEntity } from "./effect.entities";

@Entity({ name: "m_effect_kind" })
export class EffectKindEntity extends FrameworkEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: "name", length: 100 })
  public name: string;

  @Column({ name: "description" })
  public description: string;

  @ManyToMany(() => EffectEntity)
  @JoinTable({
    inverseJoinColumn: { name: "effect_id" },
    joinColumn: { name: "kind_id" },
    name: "m_effect_kind_mapping",
  })
  public effects: EffectEntity[] | null;
}
