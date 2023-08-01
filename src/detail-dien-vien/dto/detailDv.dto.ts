import { IsString,  IsNotEmpty, IsNumber, IsEmpty, IsOptional, IsBoolean, } from 'class-validator';
import { type } from 'os';
 
type RoleDienVien= "chính" | "phụ"
export class DetailDVDTO {
  @IsNotEmpty()
  @IsString()
  id_dienvien:string

  @IsNotEmpty()
  @IsString()
  id_phim:string

  @IsNotEmpty()
  @IsString()
  role: RoleDienVien;



}
