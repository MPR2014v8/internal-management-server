import mongoose from "mongoose";
import { IsNotEmpty } from 'class-validator';

export class createResetPasswordSessionDto {
  @IsNotEmpty()
  readonly token: string;

  @IsNotEmpty()
  readonly expiresAt: Date;
  readonly userId: mongoose.Schema.Types.ObjectId;
}

export class CreateSessionDto {}
