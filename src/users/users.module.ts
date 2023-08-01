import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { AuthController } from './auth.controller';
import {JwtModule} from '@nestjs/jwt'
import { AdminAuthGuard } from './adminAuth.guard';
import { AuthGuard } from './auth.guard';

@Module({
  imports:[
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({ secret: 'hard!to-guess_secret' ,global:true,signOptions:{expiresIn:'1h'}}),

   ],
  controllers: [UsersController,AuthController],
  providers: [UsersService,AdminAuthGuard,AuthGuard]
})
export class UsersModule {}
