/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type ProjectTypeDocument = ProjectType & Document;

@Schema({ timestamps: true })
export class ProjectType {
  @Prop()
  title: string;

  @Prop()
  index: number
}

export const ProjectTypeSchema = SchemaFactory.createForClass(ProjectType);
