import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { FrameworkEntity } from "../../../framework/entities/freamework.entities";
import { MaterialEntity } from "./material.entities";

@Entity({ name: "m_material_kind" })
export class MaterialKindEntity extends FrameworkEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: "name", length: 100 })
  public name: string;

  @Column({ name: "description" })
  public description: string;

  @OneToMany(() => MaterialEntity, (MaterialEntity) => MaterialEntity.kind)
  public materials: MaterialEntity[] | null;
}
