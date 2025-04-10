/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/user/schema/user.schema'; // Import the User schema

export type UserPermissionDocument = UserPermission & Document;

@Schema({ timestamps: true })
export class UserPermission {
  @Prop({ required: true })
  permissionName: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;
}

export const UserPermissionSchema =
  SchemaFactory.createForClass(UserPermission);
