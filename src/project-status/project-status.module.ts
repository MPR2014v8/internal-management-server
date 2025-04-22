import { Module } from '@nestjs/common';
import { ProjectStatusService } from './project-status.service';
import { ProjectStatusController } from './project-status.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectStatusSchema } from './schema/project-status.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name: 'ProjectStatus', schema: ProjectStatusSchema}])
  ],
  controllers: [ProjectStatusController],
  providers: [ProjectStatusService],
})
export class ProjectStatusModule {}
