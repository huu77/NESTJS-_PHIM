import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comment.dto';
import { AdminAuthGuard } from 'src/users/adminAuth.guard';
import { AuthGuard } from 'src/users/auth.guard';
import { UpdateDto } from './dto/update.dto';
 
@UsePipes(new ValidationPipe()) 
@Controller('comments')
export class CommentsController {
    constructor(private readonly commentService :CommentsService){}
    //
    @Post()
    @UseGuards(AuthGuard)
    async createComment(@Body('info') info:CommentDto):Promise<any>{
        
        return await this.commentService.createComment(info)
    }
    @Get(':id')
    @UseGuards(AuthGuard)
    async getAllCommnetofPhim(@Param('id')id:string):Promise<any>{
        return await this.commentService.getAllCommentOfPhim(id)
    }
    @Delete('removeComment/:id')
    @UseGuards(AuthGuard)
    async removeComment(@Param('id') id:string, @Req() req: Request){
        const user = req['user_data']

        return await this.commentService.removeComment(id,user.id)
    }
    @Put('update')
    @UseGuards(AuthGuard)
    async updateComment(@Body('info') info:UpdateDto){
        return await this.commentService.updateComment(info)
    }
}
