import { IsString,  IsNotEmpty, IsNumber, IsEmpty, IsOptional, } from 'class-validator';
 

export class CommentDto {
  @IsNotEmpty()
  @IsString()
  id_user:string

  @IsNotEmpty()
  @IsString()
  id_phim:string

  @IsNotEmpty()
  @IsString()
  text_comment: string;



}
