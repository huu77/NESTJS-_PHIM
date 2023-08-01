import { BaseTable } from 'src/base.entity';
import { Phim } from 'src/phims/entity/phims.entity';
import { Users } from 'src/users/entity/users.entity';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn,JoinTable,JoinColumn } from 'typeorm';

@Entity('comment')
export class Comment extends BaseTable {
  @PrimaryGeneratedColumn({ name: 'comment_id' })
  id:string

  @Column()
  text_comment: string;



  @ManyToOne(
    () => Users,
    user => user.comment,
    
  )
  users: Users;


  
  @ManyToOne(
    () => Phim,
    phim => phim.comment,
    
  )
  phims: Phim;

  
}
