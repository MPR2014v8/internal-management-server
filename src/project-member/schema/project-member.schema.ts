/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/user/schema/user.schema'; // Import the User schema
import { Project } from 'src/project/schema/project.schema'; // Import the Project schema

export type ProjectMemberDocument = ProjectMember & Document;

@Schema({ timestamps: true })
export class ProjectMember {
  @Prop()
  role: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Project' })
  project: Types.ObjectId;
}

export const ProjectMemberSchema = SchemaFactory.createForClass(ProjectMember);
