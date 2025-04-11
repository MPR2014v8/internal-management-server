import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
export class createResetPasswordSessionDto {
  @IsNotEmpty()
  readonly token: string;

  @IsNotEmpty()
  readonly expiresAt: Date;

  @IsMongoId()
  user: Types.ObjectId;
}

export class CreateSessionDto {}
