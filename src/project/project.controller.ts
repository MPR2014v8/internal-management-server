import { Controller, Post, Body, Put, Get, Delete } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './schema/project.schema';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  // Create multiple projects
  @Post('/create')
  async create(
    @Body() createProjectDtos: CreateProjectDto[],
  ): Promise<Project[]> {
    return this.projectService.create(createProjectDtos);
  }

  // Get all projects
  @Get('/all')
  async findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  // Get a single project by ID
  @Post('/getOne')
  async findOne(@Body() body: { id: string }): Promise<Project> {
    return this.projectService.findOne(body.id);
  }

  // Get multiple projects by IDs
  @Post('/findMany')
  async findMany(@Body() body: { ids: string[] }): Promise<Project[]> {
    return this.projectService.findManyByIds(body.ids);
  }

  // Update multiple projects
  @Put('/update')
  async update(
    @Body() updateProjectDtos: CreateProjectDto[],
  ): Promise<Project[]> {
    return this.projectService.update(updateProjectDtos);
  }

  // Delete multiple projects
  @Delete('/delete')
  async remove(@Body() body: { ids: string[] }): Promise<void> {
    return this.projectService.remove(body.ids);
  }
}
