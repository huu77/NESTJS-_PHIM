import { IsString,  IsNotEmpty, } from 'class-validator';
 
type Gender='nam'|'nu'
export class DienVienDto {
  @IsNotEmpty()
  @IsString()
  name_dienvien: string;

  @IsNotEmpty()
  @IsString()
  gender: Gender;

  @IsNotEmpty()
  @IsString()
  ngaySinh: string;
  @IsNotEmpty()
  @IsString()
  mota:string
  @IsNotEmpty()
  @IsString()
  address:string
  
}
