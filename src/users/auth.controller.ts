import { Body, Controller, Get, Post,Res,UsePipes  } from '@nestjs/common';
import {UsersService} from './users.service'
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';
import { ValidationPipe } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserDto } from './dto/user.dto';


@Controller('api/v1')
@UsePipes(new ValidationPipe()) 
export class AuthController {
constructor( private readonly userSevice:UsersService){}
 
 @Post('register')
async createUser(@Body('user') createUserDto:RegisterDto ,@Res() res: Response):Promise<any>{
 this.userSevice.createUser(createUserDto,res)
}
@Post('login')
async Login(@Body('login') userLogin:LoginDto,@Res() res: Response) :Promise<any>{
this.userSevice.login(userLogin,res)
}
@Post('refresh_token')
async refreshToken(@Body('refreshToken') refreshToken:string,@Res() res:Response ):Promise<any>{
this.userSevice.refreshToken(refreshToken,res)
}

}
