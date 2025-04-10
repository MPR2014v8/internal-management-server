import { Module } from '@nestjs/common';
import { ProjectMemberService } from './project-member.service';
import { ProjectMemberController } from './project-member.controller';

import { ProjectMemberSchema } from './schema/project-member.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ProjectMember', schema: ProjectMemberSchema },
    ]),
  ],
  controllers: [ProjectMemberController],
  providers: [ProjectMemberService],
})
export class ProjectMemberModule {}
