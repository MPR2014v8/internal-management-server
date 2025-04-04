import { Test, TestingModule } from '@nestjs/testing';
import { ProjectTimeSheetController } from './project-time-sheet.controller';
import { ProjectTimeSheetService } from './project-time-sheet.service';

describe('ProjectTimeSheetController', () => {
  let controller: ProjectTimeSheetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectTimeSheetController],
      providers: [ProjectTimeSheetService],
    }).compile();

    controller = module.get<ProjectTimeSheetController>(ProjectTimeSheetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
