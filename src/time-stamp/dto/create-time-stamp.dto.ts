import {
  IsString,
  IsBoolean,
  IsOptional,
  IsDate,
  IsMongoId,
} from 'class-validator';

export class CreateTimeStampDto {
  @IsOptional()
  @IsString()
  ip?: string;

  @IsOptional()
  @IsString()
  device?: string;

  @IsOptional()
  @IsDate()
  from?: Date;

  @IsOptional()
  @IsDate()
  to?: Date;

  @IsOptional()
  @IsBoolean()
  isManual?: boolean;

  @IsOptional()
  @IsString()
  remark?: string;

  @IsMongoId()
  employee: string; // Required field
}
