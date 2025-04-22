/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop({type: MongooseSchema.Types.ObjectId, ref: 'Status'})
  statusId: Types.ObjectId;

  @Prop({ type: Date })
  startDate: Date;

  @Prop({ type: Date })
  dueDate: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  projectManager: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  businessanalystLead: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  developerLead: Types.ObjectId;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
