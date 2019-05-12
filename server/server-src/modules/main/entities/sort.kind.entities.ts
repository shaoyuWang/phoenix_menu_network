import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { FrameworkEntity } from "../../../framework/entities/freamework.entities";
import { SortEntity } from "./sort.entities";

@Entity({ name: "m_sort_kind" })
export class SortKindEntity extends FrameworkEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: "name", length: 100 })
  public name: string;

  @Column({ name: "description" })
  public description: string;

  @OneToMany(() => SortEntity, (SortEntity) => SortEntity.kind)
  public sorts: SortEntity | null;
}
