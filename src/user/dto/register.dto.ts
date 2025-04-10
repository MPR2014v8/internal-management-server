import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(16)
  password: string;

  @IsNotEmpty()
  name: string;

  @IsOptional() // Optional since it's not required during registration
  tel?: string;

  @IsOptional() // Optional field for title
  title?: string;

  @IsOptional() // Optional field for isAdmin (default to false or decide your logic)
  isAdmin?: string;
}
