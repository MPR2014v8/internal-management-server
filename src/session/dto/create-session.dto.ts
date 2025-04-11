import { IsString, IsOptional, IsDate, IsMongoId } from 'class-validator';

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
  user: string | { _id: string }; // Change here: user can be a string or an object with an _id.
  _id: number;
}
