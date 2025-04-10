/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/user/schema/user.schema'; // Import the User schema

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop()
  status: string;

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
