import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
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
    @Delete('delete/:id')
    @UseGuards(AuthGuard)
    async Delete( @Param('id') idphim: string, @Req() req: Request) {
        const user = req['user_data']
        return await this.likeListService.Delete(idphim,user.id)
    }
}
