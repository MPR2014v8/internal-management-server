import { Test, TestingModule } from '@nestjs/testing';
import { TimeStampController } from './time-stamp.controller';
import { TimeStampService } from './time-stamp.service';

describe('TimeStampController', () => {
  let controller: TimeStampController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeStampController],
      providers: [TimeStampService],
    }).compile();

    controller = module.get<TimeStampController>(TimeStampController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
