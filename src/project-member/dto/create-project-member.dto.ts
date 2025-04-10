import { IsString, IsMongoId } from 'class-validator';

export class CreateProjectMemberDto {
  @IsString()
  role: string;

  @IsMongoId()
  user: string; // Foreign key to User schema

  @IsMongoId()
  project: string; // Foreign key to Project schema
}
