import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { FrameworkEntity } from "../../../framework/entities/freamework.entities";
import { SortKindEntity } from "./sort.kind.entities";

@Entity({ name: "m_sort" })
export class SortEntity extends FrameworkEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: "name", length: 100 })
  public name: string;

  @Column({ name: "description" })
  public description: string;

  @JoinColumn({ name: "kind_id" })
  @ManyToOne(() => SortKindEntity)
  public kindId: SortKindEntity | null;
}
