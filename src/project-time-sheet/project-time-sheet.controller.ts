import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProjectTimeSheetService } from './project-time-sheet.service';
import { CreateProjectTimeSheetDto } from './dto/create-project-time-sheet.dto';
import { ProjectTimeSheet } from './schema/project-time-sheet.schema';

@Controller('project-time-sheets')
export class ProjectTimeSheetController {
  constructor(
    private readonly projectTimeSheetService: ProjectTimeSheetService,
  ) {}

  // Create a new project time sheet entry
  @Post()
  async create(
    @Body() createProjectTimeSheetDto: CreateProjectTimeSheetDto,
  ): Promise<ProjectTimeSheet> {
    return this.projectTimeSheetService.create(createProjectTimeSheetDto);
  }

  // Get all project time sheets
  @Get()
  async findAll(): Promise<ProjectTimeSheet[]> {
    return this.projectTimeSheetService.findAll();
  }

  // Get a single project time sheet by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProjectTimeSheet> {
    return this.projectTimeSheetService.findOne(id);
  }

  // Update an existing project time sheet
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectTimeSheetDto: CreateProjectTimeSheetDto,
  ): Promise<ProjectTimeSheet> {
    return this.projectTimeSheetService.update(id, updateProjectTimeSheetDto);
  }

  // Delete a project time sheet by ID
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.projectTimeSheetService.remove(id);
  }
}
