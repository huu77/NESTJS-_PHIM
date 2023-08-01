import { IsString,  IsNotEmpty, IsNumber, IsEmpty, IsOptional, } from 'class-validator';
 

export class UpdateDto {
  @IsNotEmpty()
  @IsString()
  id:string
 
  @IsNotEmpty()
  @IsString()
  text_comment: string;



}
