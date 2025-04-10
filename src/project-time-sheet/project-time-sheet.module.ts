import { Module } from '@nestjs/common';
import { ProjectTimeSheetService } from './project-time-sheet.service';
import { ProjectTimeSheetController } from './project-time-sheet.controller';

import { ProjectTimeSheetSchema } from './schema/project-time-sheet.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ProjectTimeSheet', schema: ProjectTimeSheetSchema },
    ]),
  ],
  controllers: [ProjectTimeSheetController],
  providers: [ProjectTimeSheetService],
})
export class ProjectTimeSheetModule {}
