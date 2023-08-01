import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { LikeListService } from './like-list.service';
import { LikeListDto } from './dto/likeList.dto';
import { AuthGuard } from 'src/users/auth.guard';


@UsePipes(new ValidationPipe()) 
@Controller('likeList')
export class LikeListController {
    constructor(private readonly likeListService: LikeListService) {}
    @Get(':id')
    @UseGuards(AuthGuard)
    async getAllListLike(@Param('id') idUser: string): Promise<any> {
        return await this.likeListService.getAllListLike(idUser)
    }

    @Post()
    @UseGuards(AuthGuard)
    async createAndUpdate(@Body('info') info: LikeListDto) {
        return await this.likeListService.createAndUpdate(info)
    }
}
