import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entity/comment.entity';
import { Phim } from 'src/phims/entity/phims.entity';
import { Users } from 'src/users/entity/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment,Phim,Users]),
  ]
  ,
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule { }
