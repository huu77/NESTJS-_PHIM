
import { IsString, IsNotEmpty, } from 'class-validator';

export class UpdateUserDto {

    @IsNotEmpty()
    @IsString()
    full_name: string;

}
