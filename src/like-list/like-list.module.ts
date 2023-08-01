import { Module } from '@nestjs/common';
import { LikeListController } from './like-list.controller';
import { LikeListService } from './like-list.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {LikeList} from './entity/likeList.entity'
import { Phim } from 'src/phims/entity/phims.entity';
import { Users } from 'src/users/entity/users.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([LikeList,Phim,Users]),
  ],
  controllers: [LikeListController],
  providers: [LikeListService]
})
export class LikeListModule {}
