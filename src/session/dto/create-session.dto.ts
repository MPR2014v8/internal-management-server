import mongoose from "mongoose";

export class createResetPasswordSessionDto {
  readonly token: string;
  readonly expiresAt: Date;
  readonly userId: mongoose.Schema.Types.ObjectId;
}

export class CreateSessionDto {}
