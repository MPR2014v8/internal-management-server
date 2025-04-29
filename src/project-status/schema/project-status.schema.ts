/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type ProjectStatusDocument = ProjectStatus & Document;

@Schema({ timestamps: true })
export class ProjectStatus {
  @Prop()
  title: string;

  @Prop()
  index: number
}

export const ProjectStatusSchema = SchemaFactory.createForClass(ProjectStatus);
