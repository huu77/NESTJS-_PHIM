import { IsString,  IsNotEmpty, IsNumber, IsEmpty, IsOptional, IsBoolean, } from 'class-validator';
import { type } from 'os';
 
type TypeOfUnLike=true|false
export class LikeListDto {
  @IsNotEmpty()
  @IsString()
  user_like_id:string

  @IsNotEmpty()
  @IsString()
  phim_like_id:string

  @IsNotEmpty()
  @IsBoolean()
  unlike: TypeOfUnLike;



}
