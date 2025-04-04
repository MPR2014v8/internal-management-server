import { PartialType } from '@nestjs/mapped-types';
import { CreateTimeStampDto } from './create-time-stamp.dto';

export class UpdateTimeStampDto extends PartialType(CreateTimeStampDto) {}
