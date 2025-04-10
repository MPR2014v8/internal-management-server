import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProjectMemberService } from './project-member.service';
import { CreateProjectMemberDto } from './dto/create-project-member.dto';
import { ProjectMember } from './schema/project-member.schema';

@Controller('project-members')
export class ProjectMemberController {
  constructor(private readonly projectMemberService: ProjectMemberService) {}

  // Create a new project member
  @Post()
  async create(
    @Body() createProjectMemberDto: CreateProjectMemberDto,
  ): Promise<ProjectMember> {
    return this.projectMemberService.create(createProjectMemberDto);
  }

  // Get all project members
  @Get()
  async findAll(): Promise<ProjectMember[]> {
    return this.projectMemberService.findAll();
  }

  // Get a single project member by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProjectMember> {
    return this.projectMemberService.findOne(id);
  }

  // Update an existing project member
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectMemberDto: CreateProjectMemberDto,
  ): Promise<ProjectMember> {
    return this.projectMemberService.update(id, updateProjectMemberDto);
  }

  // Delete a project member by ID
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.projectMemberService.remove(id);
  }
}
