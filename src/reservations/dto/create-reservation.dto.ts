import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateReservationDto {
  @IsNumber()
  @IsNotEmpty()
  product_id: number;

  // user_id will be set from the authenticated user, so it's not included in the DTO
}