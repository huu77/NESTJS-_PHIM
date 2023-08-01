import { IsString } from 'class-validator';
import { BaseTable } from 'src/base.entity';
import { Phim } from 'src/phims/entity/phims.entity';
import { Users } from 'src/users/entity/users.entity';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn,JoinTable,JoinColumn } from 'typeorm';
export type UnlikeRoleType = true | false
@Entity('likeList')
export class LikeList extends BaseTable {
  @PrimaryGeneratedColumn({name:'id'})
  id:string
  // @Column({name:'user_like_id'})
  // user_like_id: string;
  // @Column({name:'phim_like_id'})
  // phim_like_id: string;
 

  @Column({
    type: "enum",
    enum: [true, false],
    default: false
})
  unlike: UnlikeRoleType;

 
  @ManyToOne(
    () => Users,
    user => user.likeList,
     
  )
  users: Users;


  
  @ManyToOne(
    () => Phim,
    phim => phim.likeList,
   
  )
  phims: Phim;
}
