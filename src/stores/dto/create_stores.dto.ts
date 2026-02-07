import { IsString, IsNotEmpty } from 'class-validator';

export class CreateStoresDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}