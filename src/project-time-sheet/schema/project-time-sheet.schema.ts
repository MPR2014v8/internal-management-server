/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  Document,
  Types,
  Schema as MongooseSchema,
  Decimal128,
} from 'mongoose';
import { User } from 'src/user/schema/user.schema'; // Import the User schema
import { Project } from 'src/project/schema/project.schema'; // Import the Project schema

export type ProjectTimeSheetDocument = ProjectTimeSheet & Document;

@Schema({ timestamps: true })
export class ProjectTimeSheet {
  @Prop()
  task: string;

  @Prop()
  remark: string;

  @Prop()
  time: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Project' })
  project: Types.ObjectId;
}

export const ProjectTimeSheetSchema =
  SchemaFactory.createForClass(ProjectTimeSheet);
