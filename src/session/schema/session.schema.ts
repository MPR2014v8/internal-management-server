/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SessionDocument = Session & Document;

@Schema({ timestamps: true })
export class Session {
    @Prop()
    ip: string;

    @Prop()
    device: string;

    @Prop({ required: true })
    token: string;

    @Prop({ required: true, })
    expiresAt: Date;
}

export const SessionSchema = SchemaFactory.createForClass(Session);