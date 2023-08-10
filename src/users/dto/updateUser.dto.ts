
import { IsString, IsNotEmpty, IsEmail, } from 'class-validator';

export class UpdateUserDto {

    @IsNotEmpty()
    @IsString()
    full_name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}
