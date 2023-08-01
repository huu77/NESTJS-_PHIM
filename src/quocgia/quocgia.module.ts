import { Module } from '@nestjs/common';
import { QuocgiaController } from './quocgia.controller';
import { QuocgiaService } from './quocgia.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuocGia } from './entity/quocgia.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([QuocGia]),
   ]
  ,
  controllers: [QuocgiaController],
  providers: [QuocgiaService]
})
export class QuocgiaModule {}
