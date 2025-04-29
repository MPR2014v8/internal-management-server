import { Module } from '@nestjs/common';
import { ProjectTypeService } from './project-type.service';
import { ProjectTypeController } from './project-type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectTypeSchema } from './schema/project-type.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name: 'ProjectType', schema: ProjectTypeSchema}])
  ],
  controllers: [ProjectTypeController],
  providers: [ProjectTypeService],
})
export class ProjectTypeModule {}
