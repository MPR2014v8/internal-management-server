import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectTimeSheetDto } from './create-project-time-sheet.dto';

export class UpdateProjectTimeSheetDto extends PartialType(CreateProjectTimeSheetDto) {}
