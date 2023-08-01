import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { Like, Repository, } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { UserDto } from './dto/user.dto';
import { ConfigService } from '@nestjs/config'
import { UpdateUserDto } from './dto/updateUser.dto';
import { join } from 'path';
import { existsSync, unlinkSync } from 'fs';
import { FilterDto } from './dto/filter.Dto';
//
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepo: Repository<Users>,
        private jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    //user code
    //get all
    async getAllUser(res: Response, query: FilterDto): Promise<any> {
        const item_per_page = Number(query.item_per_page) || 10;
        const page = Number(query.page) || 1;
        const search = query.search || ''
        const skip = (page - 1) * item_per_page
        const filter=query.filter
        const [users, total] = await this.userRepo.findAndCount({
            where: [
                { full_name: Like('%' + search + '%') }, { email: Like('%' + search + '%') }
            ],
            order: { createdAt: filter },
            skip: skip,
            select: ['id', 'full_name', 'email', 'img', 'createdAt', 'updatedAt']
        });

        const lastPage=Math.ceil(total/item_per_page)
        const nextPage=page+1>lastPage ?null:page+1
        const prePage=page-1<1?null:page-1
        return res.status(200).json({data:users,lastPage:lastPage,nextPage:nextPage,prePage:prePage});
    }
    //get on user
    async getOneUser(id: string, res: Response): Promise<UserDto> {
        const existingUser = await this.userRepo.findOne({ where: { id: id } });
        if (!existingUser) {
            throw new HttpException('user is not empty', HttpStatus.BAD_REQUEST);

        }
        res.status(200).json({ message: 'findone success ', existingUser })
        return existingUser
    }


    // update info user
    async updateInfoUser(id: string, newInfo: UpdateUserDto): Promise<any> {
        const user = await this.userRepo.findOne({ where: { id: id } });
        if (!user) {
            // Xử lý khi không tìm thấy người dùng
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        }
        user.full_name = newInfo.full_name

        await this.userRepo.update({ id: id }, user);
        await this.userRepo.save(user);
        return {
            message: 'User information updated successfully',
            user: user,
            status: HttpStatus.OK,
        };
    }

    //update image user
    async updateImageUser(id: string, file: any): Promise<any> {
        const user = await this.userRepo.findOne({ where: { id } });
        if (user.img) {
            const imagePath = join(user.img);
            if (existsSync(imagePath)) {
                // Xóa tệp hình ảnh hiện có
                unlinkSync(imagePath);
            }
        }


        // Save the new image and update the user's information
        user.img =  file.path.split('\\')[1];

        await this.userRepo.update({ id }, user);
        return this.userRepo.save(user);
    }
    //delete one user
    async deleteUser(id: string): Promise<any> {
        const user = await this.userRepo.findOne({ where: { id: id } });
        if (!user) {
            // Xử lý khi không tìm thấy người dùng
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        }
        await this.userRepo.delete(id);
        return {
            message: 'User deleted successfully',
            user: user,
            status: HttpStatus.OK,
        };
    }


    //  Auth code 


    // create user register
    async createUser(createUserDto: RegisterDto, res: Response): Promise<any> {


        const { user_name, email, password, confirmPassword } = createUserDto
        const existingUser = await this.userRepo.findOne({ where: { email } });

        //check mail
        if (existingUser) {
            return res.status(401).json({ message: 'mail is exists1' })
        }

        const existsUsernamePassword = await this.userRepo.findOne({ where: { user_name, password } });

        //check username pass
        if (existsUsernamePassword) {
            return res.status(401).json({ message: 'userName and Pass is exists1' })
        }
        if (password !== confirmPassword) {
            return res.status(401).json({ message: 'password and confirmPassword do not match' })
           
        }

        const newUser = new Users()
        Object.assign(newUser, createUserDto)
        await this.userRepo.save(newUser)
        return res.status(200).json({ message: 'create success ' })
    }


    // login 
    async login(userLogin: LoginDto, res: Response): Promise<any> {
        const { user_name, password } = userLogin;

        const user = await this.userRepo.findOne({ where: { user_name: user_name } })

        if (!user) {
           return res.status(401).json({messages:'username is faille'})
        }

        const checkPass = compare(password, user.password)
        if (!checkPass) {
            return  res.status(401).json({messages:'password is faille'})
        }
        const payload = { id: user.id, user_name: user_name, email: user.email, role: user.role }
        return this.generateJwt(payload, res);
    }
    //generateJwt
    private async generateJwt(payload: { id: string, user_name: string, email: string, role: string }, res: Response): Promise<any> {
        const access_token = await this.jwtService.signAsync(payload)
        const refresh_token = await this.jwtService.signAsync(payload, { secret: this.configService.get<string>('SECRET_REFESHTOKEN') || process.env.SECRET_REFESHTOKEN, expiresIn: '1d' })

        await this.userRepo.update({ email: payload.email }, { refresh_token: refresh_token })

        return res.status(200).json({ access_token, refresh_token })
    }

    //refreshToken
    async refreshToken(refreshToken: string, res: Response): Promise<any> {
        try {
            const verify = await this.jwtService.verify(refreshToken, { secret: this.configService.get<string>('SECRET_REFESHTOKEN') || process.env.SECRET_REFESHTOKEN })
            console.log(verify);
            const exitstRefreshToken = await this.userRepo.findOne({ where: { email: verify.email, refresh_token: refreshToken } })
            if (exitstRefreshToken) {
                const payload = { id: verify.id, user_name: verify.user_name, email: verify.email, role: verify.role }
                return this.generateJwt(payload, res)
            }
            else {
               return res.status(419).json({messages:"refresh_token is not valid"})
                 
            }
        } catch (error) {
            return  res.status(419).json({messages:"refresh_token is not valid"})
           
        }
    }


}
