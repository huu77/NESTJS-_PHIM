import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TheLoai } from './entity/theloai.entity';
import { Repository } from 'typeorm';
import { TheLoaiDto } from './dto/TheLoai.dto';

@Injectable()
export class TheloaisService {

    constructor(
        @InjectRepository(TheLoai)
        private readonly theloaiRepo: Repository<TheLoai>,
    ) { }

    // getAll dien vien
    async getAll(): Promise<any> {
        const theloai = await this.theloaiRepo.find()
        if (!theloai) {
            throw new HttpException('Theloai not found', HttpStatus.BAD_REQUEST);
        }
        return {
            message: 'Theloai information updated successfully',
            user: theloai,
            status: HttpStatus.OK,
        };
    }

    //get one dien vien
    async getOne(id: string): Promise<any> {
        const theloai = await this.theloaiRepo.findOne({ where: { id_theloai: id } })
        if (!theloai) {
            throw new HttpException('Theloai not found', HttpStatus.BAD_REQUEST);
        }
        return {
            message: 'Theloai information updated successfully',
            user: theloai,
            status: HttpStatus.OK,
        };

    }

    //
    async create(TheLoai: TheLoaiDto): Promise<any> {
        const theloai = await this.theloaiRepo.findOne({
            where: {
                name_theloai: TheLoai.name_theloai
            }
        })
        if (theloai) {
            throw new HttpException('theloai is exists', HttpStatus.BAD_REQUEST);
        }

        await this.theloaiRepo.save(theloai)
        return {
            message: 'The loai information create successfully',
            status: HttpStatus.OK,
        };
    }
    //update dien vien
    async updateInfo(id_theloai: string, TheLoai: TheLoaiDto): Promise<any> {
        const theloaiExits = await this.theloaiRepo.findOne({ where: { id_theloai } })
        if (!theloaiExits) {
            throw new HttpException('Dien vien is exists', HttpStatus.BAD_REQUEST);
        }
        theloaiExits.name_theloai = TheLoai.name_theloai

        await this.theloaiRepo.update({ id_theloai }, theloaiExits);
        return {
            message: 'User information update successfully',
            status: HttpStatus.OK,
        };
    }
    //delete dienvien
    async delete(id: string): Promise<any> {
        const dienVienExits = await this.theloaiRepo.findOne({ where: { id_theloai: id } })
        if (!dienVienExits) {
            throw new HttpException('Dien vien is exists', HttpStatus.BAD_REQUEST);
        }
        await this.theloaiRepo.delete(id)
        return {
            message: 'User information delete successfully',
            status: HttpStatus.OK,
        };
    }


//get phim  con loi xxx
 
    //
}
