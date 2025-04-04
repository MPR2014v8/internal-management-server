import { Test, TestingModule } from '@nestjs/testing';
import { ProjectTimeSheetService } from './project-time-sheet.service';

describe('ProjectTimeSheetService', () => {
  let service: ProjectTimeSheetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectTimeSheetService],
    }).compile();

    service = module.get<ProjectTimeSheetService>(ProjectTimeSheetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
