/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/schema/user.schema';

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

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    userId: User;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
