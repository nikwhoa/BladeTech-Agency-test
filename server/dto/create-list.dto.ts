import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateListDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;
}
