import { IsEmail, IsString, MinLength, IsIn, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsNotEmpty({ message: 'Role is required' })
  @IsIn(['client', 'business'], { message: 'Role must be either "client" or "business"' })
  role: string;
}