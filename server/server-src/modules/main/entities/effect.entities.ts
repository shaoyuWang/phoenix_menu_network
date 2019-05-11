import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { FrameworkEntity } from "../../../framework/entities/freamework.entities";

@Entity({ name: "m_effect" })
export class EffectEntity extends FrameworkEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: "name", length: 100 })
  public name: string;

  @Column({ name: "description" })
  public description: string;
}