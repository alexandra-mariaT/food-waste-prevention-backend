import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Croissant' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Croissant with chocolate and hazelnut filling' })
  @IsString()
  description: string;

  @ApiProperty({ example: 5.5 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  store_id: number; 
}