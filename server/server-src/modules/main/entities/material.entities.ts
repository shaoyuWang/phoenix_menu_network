import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { FrameworkEntity } from "../../../framework/entities/freamework.entities";
import { MaterialKindEntity } from "./material.kind.entities";

@Entity({ name: "m_material" })
export class MaterialEntity extends FrameworkEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: "name", length: 100 })
  public name: string;

  @Column({ name: "photo", length: 255 })
  public photo: string;

  @Column({ name: "description" })
  public description: string;

  @JoinColumn({ name: "kind_id" })
  @ManyToOne(() => MaterialKindEntity)
  public kind: MaterialKindEntity | null;
}
