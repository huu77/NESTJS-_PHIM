import { Module } from '@nestjs/common';
import { PhimsController } from './phims.controller';
import { PhimsService } from './phims.service';
import { Phim } from './entity/phims.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TheLoai } from 'src/theloais/entity/theloai.entity';
import { QuocGia } from 'src/quocgia/entity/quocgia.entity';
 

@Module({
  imports:[
    TypeOrmModule.forFeature([Phim ,TheLoai, QuocGia]),
   ]
  ,
  controllers: [PhimsController],
  providers: [PhimsService]
})
export class PhimsModule {}
