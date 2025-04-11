import { Controller, Get, Post, Body, Delete, Put } from '@nestjs/common';
import { ProjectMemberService } from './project-member.service';
import { CreateProjectMemberDto } from './dto/create-project-member.dto';
import { ProjectMember } from './schema/project-member.schema';

@Controller('project-members')
export class ProjectMemberController {
  constructor(private readonly projectMemberService: ProjectMemberService) {}

  // Create multiple project members
  @Post()
  async create(
    @Body() createProjectMemberDtos: CreateProjectMemberDto[],
  ): Promise<ProjectMember[]> {
    return this.projectMemberService.create(createProjectMemberDtos);
  }

  // Get all project members
  @Get()
  async findAll(): Promise<ProjectMember[]> {
    return this.projectMemberService.findAll();
  }

  // Get multiple project members by a list of IDs
  @Post('list') // Using POST to receive an array in the body
  async findManyByIds(@Body() ids: string[]): Promise<ProjectMember[]> {
    return this.projectMemberService.findManyByIds(ids);
  }

  // Update multiple project members
  @Put()
  async update(
    @Body() updateProjectMemberDtos: CreateProjectMemberDto[],
  ): Promise<ProjectMember[]> {
    return this.projectMemberService.update(updateProjectMemberDtos);
  }

  // Delete multiple project members
  @Delete()
  async remove(@Body() ids: string[]): Promise<void> {
    return this.projectMemberService.remove(ids);
  }
}
