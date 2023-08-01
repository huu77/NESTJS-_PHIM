import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
 import {ConfigModule} from '@nestjs/config'
import { CommentsModule } from './comments/comments.module';
import { PhimsModule } from './phims/phims.module';
import { TheloaisModule } from './theloais/theloais.module';
import { QuocgiaModule } from './quocgia/quocgia.module';
import { DienviensModule } from './dienviens/dienviens.module';
import { DetailDienVienModule } from './detail-dien-vien/detail-dien-vien.module';
import ormconfig from './config/typeorm'
import { ThrottlerModule } from '@nestjs/throttler';
import { LikeListModule } from './like-list/like-list.module';
 
@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot(ormconfig),
    UsersModule, CommentsModule, PhimsModule, TheloaisModule, QuocgiaModule, DienviensModule, DetailDienVienModule ,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    LikeListModule,
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
