import { Module } from '@nestjs/common';
import { TheloaisController } from './theloais.controller';
import { TheloaisService } from './theloais.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TheLoai } from './entity/theloai.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([TheLoai]),
   ]
  ,
  controllers: [TheloaisController],
  providers: [TheloaisService]
})
export class TheloaisModule {}
