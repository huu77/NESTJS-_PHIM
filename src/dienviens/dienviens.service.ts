import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DienVien } from './entity/dienvien.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DienVienDto } from './dto/dienVien.dto';
 
import * as fs from 'fs';
@Injectable()
export class DienviensService {
    constructor(@InjectRepository(DienVien) private readonly dienvienRepo: Repository<DienVien> ) {}

    // getAll dien vien
    async getAllDienVien(): Promise<any> {
        const dienvien = await this.dienvienRepo.find()
        if (!dienvien) {
            throw new HttpException('Dien vien not found', HttpStatus.BAD_REQUEST);
        }
        return {
            message: 'User information updated successfully',
            user: dienvien,
            status: HttpStatus.OK,
        };
    }

    //get one dien vien
    async getOneDienVien(id: string): Promise<any> {
        const dienvien = await this.dienvienRepo.findOne({ where: { id: id } })
        if (!dienvien) {
            throw new HttpException('Dien vien not found', HttpStatus.BAD_REQUEST);
        }
        return {
            message: 'User information updated successfully',
            user: dienvien,
            status: HttpStatus.OK,
        };

    }

    //
    async createDienVien(dienvien: DienVienDto): Promise<any> {
        const dienvienExist = await this.dienvienRepo.findOne({
            where: {
                name_dienvien: dienvien.name_dienvien
            }
        })
        if (dienvienExist) {
            throw new HttpException('Dien vien is exists', HttpStatus.BAD_REQUEST);
        }
       const newDV= new DienVien()
       newDV.name_dienvien=dienvien.name_dienvien
       newDV.gender=dienvien.gender
       newDV.ngaySinh=dienvien.ngaySinh
       newDV.mota=dienvien.mota
       newDV.address=dienvien.address

        await this.dienvienRepo.save(newDV)
        return {
            message: 'dienvien information create successfully',
            dienvien:newDV,
            status: HttpStatus.OK,
        };
    }

    // creat img
async createImg(file: any,id:string): Promise<any> {
    const filePath = file.path
    const dienvien = await this.dienvienRepo.findOne({ where: { id } })
    if (!dienvien) {
      throw new HttpException('dienviens is not create', HttpStatus.BAD_REQUEST);
    }
    const safeFilePath = filePath.split('\\')[1];
    try {

      dienvien.image = safeFilePath
      

      await this.dienvienRepo.save(dienvien);
    } catch (error) {
      try {
        fs.unlinkSync(filePath); // Xóa hình ảnh từ thư mục
      } catch (err) {
        console.error('Error while deleting image:', err);
      }
      throw new HttpException('Img is not updated', HttpStatus.BAD_REQUEST);
    }

}

    //update dien vien
    async updateInfoDienVien(id: string, dienvien: DienVienDto): Promise<any> {
        const dienVienExits = await this.dienvienRepo.findOne({ where: { id } })
        if (!dienVienExits) {
            throw new HttpException('Dien vien is exists', HttpStatus.BAD_REQUEST);
        }
        dienVienExits.name_dienvien = dienvien.name_dienvien
        dienVienExits.ngaySinh = dienvien.ngaySinh
        await this.dienvienRepo.save(dienVienExits)
        return {
            message: 'User information update successfully',
            dienvien:dienVienExits,
            status: HttpStatus.OK,
        };
    }
    //delete dienvien
    async deleteDienVien(id: string): Promise<any> {
        const dienVienExits = await this.dienvienRepo.findOne({ where: { id } })
        if (!dienVienExits) {
            throw new HttpException('Dien vien is exists', HttpStatus.BAD_REQUEST);
        }
        await this.dienvienRepo.delete(id)
        return {
            message: 'dien vien information delete successfully',
            status: HttpStatus.OK,
        };
    }




    //
}
