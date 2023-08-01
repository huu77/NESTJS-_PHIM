import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
  import { Phim } from 'src/phims/entity/phims.entity';
import { BaseTable } from 'src/base.entity';
import { DetailDienVien } from 'src/detail-dien-vien/entity/detailDienVien.entity';
export type Gender='nam'|'nu'
@Entity()
export class DienVien extends BaseTable {
  @PrimaryGeneratedColumn({name:'id'})
  id: string;

  @Column()
  name_dienvien: string; 
  
  @Column({default:''})
  image: string; 

  @Column({
    type: "enum",
    enum: ["nam", "nu"],
    default: "nam"
  })
  gender: Gender; 

  @Column()
  ngaySinh: string; 

  @Column({default:''})
  mota: string; 

  @Column({default:''})
  address: string; 


  // @ManyToMany(
 
  @OneToMany(() => DetailDienVien, dt => dt.dienvien)
public detail: DetailDienVien[];
}
