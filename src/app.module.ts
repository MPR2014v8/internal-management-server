import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './user/user.module';
import { SessionModule } from './session/session.module';
import { TimeStampModule } from './time-stamp/time-stamp.module';
import { UserPermissionModule } from './user-permission/user-permission.module';
import { ProjectMemberModule } from './project-member/project-member.module';
import { ProjectModule } from './project/project.module';
import { ProjectTimeSheetModule } from './project-time-sheet/project-time-sheet.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(
      `mongodb://${process.env.URL_DB}:${process.env.PORT_DB}`,
      {
        user: process.env.USER_DB,
        pass: process.env.PASS_DB,
        dbName: process.env.DB_NAME,
      },
    ),
    UserModule,
    SessionModule,
    TimeStampModule,
    UserPermissionModule,
    ProjectModule,
    ProjectMemberModule,
    ProjectTimeSheetModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
