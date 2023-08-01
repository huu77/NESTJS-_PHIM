import { IsString,  IsNotEmpty, } from 'class-validator';
import { UserRoleType } from '../entity/users.entity';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  user_name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  id: string;


  @IsNotEmpty()
  @IsString()
  full_name: string;

  
  @IsNotEmpty()
  @IsString()
  refresh_token: string;

    
  @IsNotEmpty()
  @IsString()
  role: UserRoleType;

  @IsNotEmpty()
  @IsString()
  img: string;
  
}
