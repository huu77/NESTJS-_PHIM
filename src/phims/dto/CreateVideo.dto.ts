import { IsString,  IsNotEmpty, IsNumber, IsEmpty, IsOptional, } from 'class-validator';
 

export class CreateVideoDto {
 
  @IsNotEmpty()
  @IsString()
  namePhim: string;

  @IsNotEmpty()
  @IsString()
  mota: string;

  @IsNotEmpty()
  @IsString()
  ngay_phat_hanh:string

  @IsNotEmpty()
  @IsNumber()
  diem_danh_gia:number

  @IsNotEmpty()
  @IsNumber()
  tapphim:number
  
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  src :string 

  @IsString()
  id_theloai :string 

  @IsString()
  quocGiaId :string

}
