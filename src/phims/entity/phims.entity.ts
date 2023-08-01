import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TheLoai } from 'src/theloais/entity/theloai.entity';
import { QuocGia } from 'src/quocgia/entity/quocgia.entity';
import { Users } from 'src/users/entity/users.entity';
import { DienVien } from 'src/dienviens/entity/dienvien.entity';
import { BaseTable } from 'src/base.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { Comment } from 'src/comments/entity/comment.entity';
import { DetailDienVien } from 'src/detail-dien-vien/entity/detailDienVien.entity';

@Entity()
export class Phim extends BaseTable {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  namePhim: string;

  @Column()
  mota: string;

  @Column({ default: '' })
  img_nen: string;

 

  @Column()
  ngay_phat_hanh: string;

  @Column({ default: 1 })
  diem_danh_gia: number;


  @Column({ default: 1 })
  tapphim: number;

  @Column({ default: '' })
  src: string;


  // N:1
  @ManyToOne(() => TheLoai, (theloai) => theloai.id_theloai)
  theloai: TheLoai;
  // N:1
  @ManyToOne(() => QuocGia, (quocgia) => quocgia.id_quocgia)
  quocgia: QuocGia;

  // // N:N comment
  @OneToMany(() => Comment, (comment) => comment.phims)
  comment?: Comment[]


  // N:N likelist
  @ManyToMany(() => Comment, (comment) => comment.phims)
   likeList?: Comment[]

  // N:N
 
  @OneToMany(() => DetailDienVien, dt => dt.phim)
   detail: DetailDienVien[];

}
