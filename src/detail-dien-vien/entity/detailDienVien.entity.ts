import { BaseTable } from 'src/base.entity';
import { DienVien } from 'src/dienviens/entity/dienvien.entity';
import { Phim } from 'src/phims/entity/phims.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
  export type RoleDienVien= "chính" | "phụ"
@Entity('dienvien_phim')
export class DetailDienVien extends BaseTable {
  @PrimaryGeneratedColumn({name:'id'})
  id: string; 

  
  @Column({
    type: "enum",
    enum: ["chính", "phụ"],
    default: "phụ"
})
role: RoleDienVien
 


@ManyToOne(() => Phim, (phim) => phim.detail)
public phim: Phim

@ManyToOne(() => DienVien, (dienvien) => dienvien.detail)
public dienvien: DienVien
}
