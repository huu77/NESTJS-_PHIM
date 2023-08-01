
import { BaseTable } from 'src/base.entity';
import { Phim } from 'src/phims/entity/phims.entity';
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
export type UserRoleType = "admin" | "user"
import {hash} from 'bcrypt'
import { Comment } from 'src/comments/entity/comment.entity';
import { LikeList } from 'src/like-list/entity/likeList.entity';
@Entity()
export class Users extends BaseTable {
  @PrimaryGeneratedColumn({name: 'id'})
  id: string;

  @Column({  default:''})
  full_name: string;

  @Column()
  email: string;

  @Column({nullable: true})
  user_name: string;

  @Column( { nullable: true})
  password: string;


  // hash before insert type of bcrypt
  @BeforeInsert()
  async hashPassword(){
    this.password=await hash(this.password,10)
  }
  @Column({   default:''})
  token: string;

  @Column({  default:''})
  refresh_token: string;

  @Column({
    type: "enum",
    enum: ["admin", "user"],
    default: "user"
  })
  role: UserRoleType;

  @Column({default:''})
  img: string;
 
  @OneToMany(() => Comment, comment => comment.users)
  comment: Comment[];

 

// like list
  @OneToMany(() => LikeList, likeList => likeList.users)
  likeList: LikeList[];
}
