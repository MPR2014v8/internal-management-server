import { Module } from '@nestjs/common';
import { TimeStampService } from './time-stamp.service';
import { TimeStampController } from './time-stamp.controller';

@Module({
  controllers: [TimeStampController],
  providers: [TimeStampService],
})
export class TimeStampModule {}
