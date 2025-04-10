import { IsString, IsMongoId, IsOptional } from 'class-validator';

export class CreateProjectTimeSheetDto {
  @IsString()
  @IsOptional() // Optional because the task and remark may not always be required
  task?: string;

  @IsString()
  @IsOptional() // Optional remark
  remark?: string;

  @IsString()
  time: string; // Store time as a string (e.g., '14:30:00')

  @IsMongoId()
  user: string; // Foreign key to User schema

  @IsMongoId()
  project: string; // Foreign key to Project schema
}
