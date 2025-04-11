import { Controller, Get, Post, Body, Delete, Put } from '@nestjs/common';
import { ProjectMemberService } from './project-member.service';
import { CreateProjectMemberDto } from './dto/create-project-member.dto';
import { ProjectMember } from './schema/project-member.schema';

@Controller('project-members')
export class ProjectMemberController {
  constructor(private readonly projectMemberService: ProjectMemberService) {}

  // Create multiple project members
  @Post('/create')
  async create(
    @Body() createProjectMemberDtos: CreateProjectMemberDto[],
  ): Promise<ProjectMember[]> {
    return this.projectMemberService.create(createProjectMemberDtos);
  }

  // Get all project members
  @Get('/findAll')
  async findAll(): Promise<ProjectMember[]> {
    return this.projectMemberService.findAll();
  }

  @Post('/findOne')
  async findOne(@Body() body:{id :string}): Promise<ProjectMember> {
    return this.projectMemberService.findOne(body.id);
  }

  // Get multiple project members by a list of IDs
  @Post('/findMany') // Using POST to receive an array in the body
  async findManyByIds(@Body() ids: string[]): Promise<ProjectMember[]> {
    return this.projectMemberService.findManyByIds(ids);
  }

  // Update multiple project members
  @Put('/update')
  async update(
    @Body() updateProjectMemberDtos: CreateProjectMemberDto[],
  ): Promise<ProjectMember[]> {
    return this.projectMemberService.update(updateProjectMemberDtos);
  }

  // Delete multiple project members
  @Delete('/delete')
  async remove(@Body() ids: string[]): Promise<void> {
    return this.projectMemberService.remove(ids);
  }
}
