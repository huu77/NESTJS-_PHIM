import { Body, Controller, Get, Param, Post, Put, UseGuards, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { QuocgiaService } from './quocgia.service';
import { AdminAuthGuard } from 'src/users/adminAuth.guard';
import { QuocGiaDto } from './dto/quocgia.dto';
@UsePipes(new ValidationPipe()) 
@Controller('quocgia')
export class QuocgiaController {
    constructor( private readonly quocgiaService:QuocgiaService){}
   
    @Get('')
    @UseGuards(AdminAuthGuard)
    async getAll(): Promise<any> {
        return this.quocgiaService.getAll()
    }
    @Get(':id')
    @UseGuards(AdminAuthGuard)
    async getOne(@Param('id') id: string): Promise<any> {
        return this.quocgiaService.getOne(id)
    }
    @Post('')
    @UseGuards(AdminAuthGuard)
    async creatDienvien(@Body('newTheloai') theloai: QuocGiaDto): Promise<any> {
        return this.quocgiaService.create(theloai);
    }
    @Put(':id')
    @UseGuards(AdminAuthGuard)
    async updateInfoDienVien(@Param('id') id: string,@Body('newTheloai') theloai: QuocGiaDto ): Promise<any> {
        return this.quocgiaService.updateInfo(id,theloai)
    }
    @Delete(':id')
    @UseGuards(AdminAuthGuard)
    async deleteDienVien(@Param('id') id: string ): Promise<any> {
        return this.quocgiaService.delete(id)
    }
}

