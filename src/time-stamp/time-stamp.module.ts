import { Module } from '@nestjs/common';
import { TimeStampService } from './time-stamp.service';
import { TimeStampController } from './time-stamp.controller';

import { TimeStampSchema } from './schema/time-stamp.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'TimeStamp', schema: TimeStampSchema }]),
  ],
  controllers: [TimeStampController],
  providers: [TimeStampService],
})
export class TimeStampModule {}
