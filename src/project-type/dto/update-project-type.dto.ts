import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectTypeDto } from './create-project-type.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateProjectTypeDto extends PartialType(CreateProjectTypeDto) {
    @IsNumber()
    @IsOptional()
    index: number
}
