import { IsString, IsMongoId } from 'class-validator';

export class CreateUserPermissionDto {
  @IsString()
  permissionName: string;

  @IsMongoId()
  user: string;
  _id: number;
}
