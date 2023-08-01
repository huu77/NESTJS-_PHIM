import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
  import { Phim } from 'src/phims/entity/phims.entity';
import { BaseTable } from 'src/base.entity';
@Entity()
export class QuocGia extends BaseTable {
  @PrimaryGeneratedColumn({name:"quocgiaid"})
  id_quocgia: string;

  @Column()
  name_quocgia: string; 
  @OneToMany(()=>Phim,(phim)=>phim.quocgia)
  phim:Phim[]
}
