import { Test, TestingModule } from '@nestjs/testing';
import { TimeStampService } from './time-stamp.service';

describe('TimeStampService', () => {
  let service: TimeStampService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeStampService],
    }).compile();

    service = module.get<TimeStampService>(TimeStampService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
