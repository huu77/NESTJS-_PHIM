import { Body, Controller, Get, Param, Post, Res, UsePipes, UseGuards, Req, UseInterceptors, UploadedFile, Delete, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service'
import { Response } from 'express';
import { ValidationPipe } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from './auth.guard';
import { AdminAuthGuard } from './adminAuth.guard';
import { UpdateUserDto } from './dto/updateUser.dto';
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname, join } from 'path'
import { multerOptions } from '../config/multerConfig'
import { of } from 'rxjs';
import { FilterDto } from './dto/filter.Dto';


@Controller('users')
@UsePipes(new ValidationPipe())
export class UsersController {
  constructor(private readonly userSevice: UsersService) { }
  //get all user
  @UseGuards(AdminAuthGuard)
  @Get()
  async getAllUser(@Res() res: Response, @Query() query: FilterDto): Promise<any> {
    return this.userSevice.getAllUser(res, query);
  }
  @Get(':id')
  @UseGuards(AuthGuard)
  async getOneUser(@Param('id') id: string, @Res() res: Response): Promise<UserDto> {
    return this.userSevice.getOneUser(id, res)
  }


  @Post('upload/images')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  @UseGuards(AuthGuard)
  async updateImageUser(@UploadedFile() file: any, @Req() req: Request): Promise<any> {
    const user = req['user_data']

    this.userSevice.updateImageUser(user.id, file)
  }
  //
  @Put('upload/info')
  @UseGuards(AuthGuard)
  async updateInfoUser(@Body('InfoNewUser') newInfo: UpdateUserDto, @Req() req: Request): Promise<any> {
    const user = req['user_data']
   
    return this.userSevice.updateInfoUser(user.id, newInfo)
  }
  // get img user 
  @Get('profile-img/:image')
  @UseGuards(AuthGuard)
  async getProfileImage(@Param('image') image: string, @Res() res: Response): Promise<any> {
    const imagePath = join(process.cwd(), 'uploads/' + image)
    return of(res.sendFile(imagePath));
  }
  //delete user
  @Delete('delete/:id')
  @UseGuards(AdminAuthGuard)
  async deleteUser(@Param('id') id: string): Promise<any> {

    return this.userSevice.deleteUser(id);
  }

}