import { IsString, IsMongoId, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsString()
  statusId: string;

  @IsOptional()
  startDate?: Date;

  @IsOptional()
  dueDate?: Date;

  @IsMongoId()
  projectManager: string; // Foreign key to User schema

  @IsMongoId()
  businessanalystLead: string; // Foreign key to User schema

  @IsMongoId()
  developerLead: string; // Foreign key to User schema

  _id: string;
}
