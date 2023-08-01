import { Controller, UsePipes, ValidationPipe, Get, Post, Put, Delete, Param, UseGuards, Body } from '@nestjs/common';
import { TheloaisService } from './theloais.service';
import { AdminAuthGuard } from 'src/users/adminAuth.guard';
import { TheLoaiDto } from './dto/TheLoai.dto';
import { AuthGuard } from 'src/users/auth.guard';



@UsePipes(new ValidationPipe())
@Controller('theloais')
export class TheloaisController {
    constructor(private readonly theloaiService: TheloaisService) { }

    @Get('')
    @UseGuards(AdminAuthGuard)
    async getAll(): Promise<any> {
        return this.theloaiService.getAll()
    }
    @Get(':id')
    @UseGuards(AdminAuthGuard)
    async getOne(@Param('id') id: string): Promise<any> {
        return this.theloaiService.getOne(id)
    }
    @Post('')
    @UseGuards(AdminAuthGuard)
    async creatDienvien(@Body('newTheloai') theloai: TheLoaiDto): Promise<any> {
        return this.theloaiService.create(theloai);
    }
    @Put(':id')
    @UseGuards(AdminAuthGuard)
    async updateInfoDienVien(@Param('id') id: string, @Body('newTheloai') theloai: TheLoaiDto): Promise<any> {
        return this.theloaiService.updateInfo(id, theloai)
    }
    @Delete(':id')
    @UseGuards(AdminAuthGuard)
    async deleteDienVien(@Param('id') id: string): Promise<any> {
        return this.theloaiService.delete(id)
    }
    
}
