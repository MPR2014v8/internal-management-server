/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

import { User } from 'src/user/schema/user.schema'; // Import the User schema

export type SessionDocument = Session & Document;

@Schema({ timestamps: true })
export class Session {
  @Prop()
  ip: string;

  @Prop()
  device: string;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  expiresAt: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
