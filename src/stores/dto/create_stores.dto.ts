import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateStoresDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}