import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { QuocGia } from './entity/quocgia.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuocGiaDto } from './dto/quocgia.dto';

@Injectable()
export class QuocgiaService {
    constructor(
        @InjectRepository(QuocGia)
        private readonly quocgiaRepo: Repository<QuocGia>,
    ) { }

      // getAll dien vien
      async getAll(): Promise<any> {
        const quocgia = await this.quocgiaRepo.find()
        if (!quocgia) {
            throw new HttpException('quocgia not found', HttpStatus.BAD_REQUEST);
        }
        return {
            message: 'quocgia information updated successfully',
            user: quocgia,
            status: HttpStatus.OK,
        };
    }

    //get one dien vien
    async getOne(id: string): Promise<any> {
        const quocgia = await this.quocgiaRepo.findOne({ where: { id_quocgia: id } })
        if (!quocgia) {
            throw new HttpException('quocgia not found', HttpStatus.BAD_REQUEST);
        }
        return {
            message: 'quocgia information updated successfully',
            user: quocgia,
            status: HttpStatus.OK,
        };

    }

    //
    async create(QuocGia: QuocGiaDto): Promise<any> {
        const quocgia = await this.quocgiaRepo.findOne({
            where: {
                name_quocgia: QuocGia.name_quocgia
            }
        })
        if (quocgia) {
            throw new HttpException('quocgia is exists', HttpStatus.BAD_REQUEST);
        }

        await this.quocgiaRepo.save(quocgia)
        return {
            message: 'The loai information create successfully',
            status: HttpStatus.OK,
        };
    }
    //update dien vien
    async updateInfo(id_quocgia: string, QuocGia: QuocGiaDto): Promise<any> {
        const quocgiaExits = await this.quocgiaRepo.findOne({ where: { id_quocgia } })
        if (!quocgiaExits) {
            throw new HttpException('Dien vien is exists', HttpStatus.BAD_REQUEST);
        }
        quocgiaExits.name_quocgia = QuocGia.name_quocgia

        await this.quocgiaRepo.update({ id_quocgia }, quocgiaExits);
        return {
            message: 'quocgia information update successfully',
            status: HttpStatus.OK,
        };
    }
    //delete dienvien
    async delete(id: string): Promise<any> {
        const quocgiaExits = await this.quocgiaRepo.findOne({ where: { id_quocgia: id } })
        if (!quocgiaExits) {
            throw new HttpException('  quocgia is exists', HttpStatus.BAD_REQUEST);
        }
        await this.quocgiaRepo.delete(id)
        return {
            message: '  quocgia information delete successfully',
            status: HttpStatus.OK,
        };
    }



}
