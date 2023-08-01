import { IsString,  IsNotEmpty, } from 'class-validator';

export class LoginDto {


  @IsNotEmpty()
  @IsString()
  user_name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

 
}
