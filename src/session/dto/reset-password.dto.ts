import { IsMongoId, IsNotEmpty } from 'class-validator';
export class createResetPasswordSessionDto {
  @IsNotEmpty()
  readonly token: string;

  @IsNotEmpty()
  readonly expiresAt: Date;

  @IsMongoId()
  user: string;
}

export class CreateSessionDto {}
