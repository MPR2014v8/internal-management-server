import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsMongoId,
  } from 'class-validator';
  import { Types } from 'mongoose';

export class UpdateUserDto {
      @IsNotEmpty()
      @IsMongoId()
      _id: Types.ObjectId;
    
      @IsEmail()
      email: string;
    
      @IsOptional()
      name: string;
    
      @IsOptional()
      isActive?: boolean;
    
      @IsOptional() // Optional since it's not required during registration
      tel?: string;
    
      @IsOptional() // Optional field for title
      title?: string;
    
      @IsOptional() // Optional field for isAdmin (default to false or decide your logic)
      isAdmin?: string;
}
