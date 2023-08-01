import { Module } from '@nestjs/common';
import { DienviensController } from './dienviens.controller';
import { DienviensService } from './dienviens.service';
import { AdminAuthGuard } from 'src/users/adminAuth.guard';
import { AuthGuard } from 'src/users/auth.guard';
import { DienVien } from './entity/dienvien.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([DienVien]),
   
   ],
  controllers: [DienviensController],
  providers: [DienviensService,AdminAuthGuard,AuthGuard]
})
export class DienviensModule {}
