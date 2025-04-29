import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectStatusDto } from './create-project-status.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateProjectStatusDto extends PartialType(CreateProjectStatusDto) {
    @IsNumber()
    @IsOptional()
    index: number
}
