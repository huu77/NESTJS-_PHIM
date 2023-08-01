import { Controller, Get, UseGuards, UsePipes, ValidationPipe, Res, Param, Post, Body, Put, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { DienviensService } from './dienviens.service';
import { AdminAuthGuard } from 'src/users/adminAuth.guard';
import { DienVien } from './entity/dienvien.entity';
import { DienVienDto } from './dto/dienVien.dto';
import { multerOptions } from 'src/config/multerConfig';
import { FileInterceptor } from '@nestjs/platform-express/multer';
 
import { join } from 'path';
import { of } from 'rxjs';
import { Response as RP} from 'express';
import { AuthGuard } from 'src/users/auth.guard';

@UsePipes(new ValidationPipe())
@Controller('dienviens')
export class DienviensController {
    constructor(private readonly dienvienService: DienviensService) {}

    @Get('')
    // @UseGuards(AdminAuthGuard)
    async getAllDienVien(): Promise<any> {
        return this.dienvienService.getAllDienVien()
    }
    @Get(':id')
    @UseGuards(AuthGuard)
    async getOneDienVien(@Param('id') id: string): Promise<any> {
        return this.dienvienService.getOneDienVien(id)
    }
    @Post('create_dien-vien')
    @UseGuards(AdminAuthGuard)
    async creatDienvien(@Body('newDienVien') dienvien: DienVienDto): Promise<any> {
    
        return this.dienvienService.createDienVien(dienvien);
    }
    @Post('create_img/:id')
    @UseInterceptors(FileInterceptor('file',multerOptions))
    async createImg( @UploadedFile() file: any,@Param('id') id:string): Promise<any> {
        return this.dienvienService.createImg(file,id);
    }


    //update
    @Put(':id')
    @UseGuards(AdminAuthGuard)
    async updateInfoDienVien(@Param('id') id: string,@Body('newDienvien') dienvien: DienVienDto ): Promise<any> {
        return this.dienvienService.updateInfoDienVien(id,dienvien)
    }

    //delete
    @Delete(':id')
    @UseGuards(AdminAuthGuard)
    async deleteDienVien(@Param('id') id: string ): Promise<any> {
        return this.dienvienService.deleteDienVien(id)
    }

 
}
