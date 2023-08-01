import { Module } from '@nestjs/common';
import { DetailDienVienController } from './detail-dien-vien.controller';
import { DetailDienVienService } from './detail-dien-vien.service';
import { DetailDienVien } from './entity/detailDienVien.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DienVien } from 'src/dienviens/entity/dienvien.entity';
import { Phim } from 'src/phims/entity/phims.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DetailDienVien,DienVien,Phim]),
  ],
  controllers: [DetailDienVienController],
  providers: [DetailDienVienService]
})
export class DetailDienVienModule {}
