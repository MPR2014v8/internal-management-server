import { IsNotEmpty } from 'class-validator';
export class createResetPasswordSessionDto {
  @IsNotEmpty()
  readonly token: string;

  @IsNotEmpty()
  readonly expiresAt: Date;
}

export class CreateSessionDto {}
