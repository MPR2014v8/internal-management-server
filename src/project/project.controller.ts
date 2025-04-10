import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './schema/project.schema';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  // Create a new project
  @Post()
  async create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectService.create(createProjectDto);
  }

  // Get all projects
  @Get()
  async findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  // Get a single project by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Project> {
    return this.projectService.findOne(id);
  }

  // Update a project by ID
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: CreateProjectDto,
  ): Promise<Project> {
    return this.projectService.update(id, updateProjectDto);
  }

  // Delete a project by ID
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.projectService.remove(id);
  }
}
