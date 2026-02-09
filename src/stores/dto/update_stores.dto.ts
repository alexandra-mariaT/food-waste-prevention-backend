import { IsString, IsOptional } from 'class-validator';

export class UpdateStoresDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  address?: string;
}
