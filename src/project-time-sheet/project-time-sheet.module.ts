import { Module } from '@nestjs/common';
import { ProjectTimeSheetService } from './project-time-sheet.service';
import { ProjectTimeSheetController } from './project-time-sheet.controller';

@Module({
  controllers: [ProjectTimeSheetController],
  providers: [ProjectTimeSheetService],
})
export class ProjectTimeSheetModule {}
