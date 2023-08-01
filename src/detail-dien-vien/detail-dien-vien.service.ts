 
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailDienVien } from './entity/detailDienVien.entity';
import { In, Repository } from 'typeorm';
import { DetailDVDTO } from './dto/detailDv.dto';
import { DienVien } from 'src/dienviens/entity/dienvien.entity';
import { Phim } from 'src/phims/entity/phims.entity';

@Injectable()
export class DetailDienVienService {
    constructor(@InjectRepository(DetailDienVien) private readonly detailDVREPO: Repository<DetailDienVien>,
    @InjectRepository(DienVien) private readonly dienvienRepo: Repository<DienVien>,
    @InjectRepository(Phim) private readonly phimRepo: Repository<Phim> ) { }


    // from id phim get dien vien of phim
    async getDvofPhims(id: string): Promise<any> {
        
        const dt=await this.detailDVREPO.find({where:{phim:{id}},select:['id','role']})
        if (!dt) {
            throw new HttpException('detail not found', HttpStatus.BAD_REQUEST);
          }
        
          // log id of detail
        const map=dt.map((x)=>x.id)
        //get list detail relation with dienvien
        
        const dienvien=await this.detailDVREPO.find({relations:['dienvien'],where:{id:In(map)}})
        //map get list dien vien from detail
        const dv= dienvien.map((x)=>x.dienvien)


        if (!dv) {
            throw new HttpException('Not dienvien', HttpStatus.BAD_REQUEST);
        }
        return {
            message: 'listDetailDienVien detail dien vien get all successfully',
            dienvien: dv,
            status: HttpStatus.OK,
        };
    }
    async createAndUpdate(info: DetailDVDTO): Promise<any> {

        

        const { id_dienvien, id_phim, role } = info
        try {
           const dienvien=await this.dienvienRepo.findOne({where:{id:id_dienvien}}) 
           const phim=await this.phimRepo.findOne({where:{id:id_phim}})
           if (!dienvien || !phim) {
            throw new HttpException('Invalid dienvien or phim ID', HttpStatus.BAD_REQUEST);
          }

          const newDT= this.detailDVREPO.create({
            role:role,
            phim:phim,
            dienvien:dienvien
          })
          await this.detailDVREPO.save(newDT)
          return {
            message: 'detail dien vien information get all successfully',
            user: newDT,
            status: HttpStatus.OK,
          };
        } catch (error) {
            throw new HttpException('detailDienVien is not create', HttpStatus.BAD_REQUEST);
        }
    }

}
