import { Module } from '@nestjs/common';
import { UserPermissionService } from './user-permission.service';
import { UserPermissionController } from './user-permission.controller';

import { UserPermissionSchema } from './schema/user-permission.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UserPermission', schema: UserPermissionSchema },
    ]),
  ],
  controllers: [UserPermissionController],
  providers: [UserPermissionService],
})
export class UserPermissionModule {}
