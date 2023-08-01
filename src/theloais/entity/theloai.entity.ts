import { BaseTable } from 'src/base.entity';
import { Phim } from 'src/phims/entity/phims.entity';
import { Column, Entity, PrimaryGeneratedColumn ,OneToMany} from 'typeorm';
  
@Entity()
export class TheLoai extends BaseTable{
  @PrimaryGeneratedColumn({ name: 'theloaiId' })
  id_theloai: string;

  @Column()
  name_theloai: string; 
  @OneToMany(()=>Phim,(phim)=>phim.quocgia)
  phim:Phim[]
}
