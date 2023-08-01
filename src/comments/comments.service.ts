import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { CommentDto } from './dto/comment.dto';
import { Comment } from './entity/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entity/users.entity';
import { Phim } from 'src/phims/entity/phims.entity';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class CommentsService {

    constructor(  @InjectRepository(Comment) private readonly commentRepo:Repository<Comment>, 
     @InjectRepository(Users) private readonly userRepo: Repository<Users>, 
     @InjectRepository(Phim) private readonly phimRepo: Repository<Phim>){}

    async createComment(info: CommentDto): Promise<any> {
        try {
          const { id_user, id_phim, text_comment } = info;
          const user = await this.userRepo.findOne({ where: { id: id_user } })
          const phim = await this.phimRepo.findOne({ where: { id: id_phim } })
          if (!user || !phim) {
              throw new HttpException('Invalid dienvien or phim ID', HttpStatus.BAD_REQUEST);
          }
          const list = new Comment()
          list.phims = phim
          list.users = user
          list.text_comment = text_comment
          await this.commentRepo.save(list)

          return {
              message: 'list information create successfully',
              user: list,
              status: HttpStatus.OK,
          };
            
        } catch (error) {
          console.error('Error while creating/updating comment:', error);
          throw new HttpException('Failed to create/update comment', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
      
      //from id phim , i get all comment of phim, i want get textcomment and user
      async getAllCommentOfPhim(id:string):Promise<any>{
          const checkComment=await this.commentRepo.find({ relations:{ phims:false},where:{ phims:{id:id}},select:['id']})
          if(!checkComment){
              throw new HttpException('Not id phim', HttpStatus.BAD_REQUEST);
          }
          const listId= checkComment.map(x=>x.id)
          const listUser= await this.commentRepo.find({relations:{users:true},where:{id:In(listId)},select:['id','text_comment','users']})
         
        return {
            message: 'comment information get all successfully',
            user: listUser,
            status: HttpStatus.OK,
          };
      }

      async removeComment(id:string):Promise<any>{
        const removeID= await this.commentRepo.delete(id)
        if(!removeID){
          throw new HttpException('Not id of comment is empty', HttpStatus.BAD_REQUEST);
        }
        return {
          message: 'comment has id is removing successfully',
          status: HttpStatus.OK,
        };
      }

      // update comment
      async updateComment(info:UpdateDto):Promise<any>{
        const {id,text_comment}=info
        const comment=await this.commentRepo.findOne({where:{id}})
        comment.text_comment=text_comment
        await this.commentRepo.save(comment)
        return {
          message: 'comment  is updating successfully',
          status: HttpStatus.OK,
        };
      }
}
