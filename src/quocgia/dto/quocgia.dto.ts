import { IsString,  IsNotEmpty, } from 'class-validator';
 

export class QuocGiaDto {
 
  @IsNotEmpty()
  @IsString()
  name_quocgia: string;
 
}
