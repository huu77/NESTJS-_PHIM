import { IsString,  IsNotEmpty, } from 'class-validator';
 

export class TheLoaiDto {
 
  @IsNotEmpty()
  @IsString()
  name_theloai: string;
 
}
