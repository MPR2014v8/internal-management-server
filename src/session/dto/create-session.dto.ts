import { IsString, IsOptional, IsDate, IsMongoId } from 'class-validator';
import mongoose from 'mongoose';

export class CreateSessionDto {
  @IsOptional()
  @IsString()
  ip?: string;

  @IsOptional()
  @IsString()
  device?: string;

  @IsString()
  token: string;

  @IsDate()
  expiresAt: Date;

  @IsMongoId()
  user: string;
}
