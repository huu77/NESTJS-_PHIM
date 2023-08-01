import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { DetailDienVien } from './entity/detailDienVien.entity';
import { DetailDVDTO } from './dto/detailDv.dto';
import { DetailDienVienService } from './detail-dien-vien.service';
import { AdminAuthGuard } from 'src/users/adminAuth.guard';
import { AuthGuard } from 'src/users/auth.guard';

@UsePipes(new ValidationPipe())
@Controller('detail-dien-vien')
export class DetailDienVienController {
    constructor(private readonly detailDienvienService: DetailDienVienService) { }

    @Get(':id')
    @UseGuards(AuthGuard)
    async getDvofPhims(@Param('id') id: string): Promise<any> {
        return await this.detailDienvienService.getDvofPhims(id)
    }

    @Post()
    @UseGuards(AdminAuthGuard)
    async createAndUpdate(@Body('info') info: DetailDVDTO): Promise<any> {
        return await this.detailDienvienService.createAndUpdate(info)
    }
}
