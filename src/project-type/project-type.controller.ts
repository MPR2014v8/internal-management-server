import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectTypeService } from './project-type.service';
import { CreateProjectTypeDto } from './dto/create-project-type.dto';
import { UpdateProjectTypeDto } from './dto/update-project-type.dto';

@Controller('project-type')
export class ProjectTypeController {
  constructor(private readonly projectTypeService: ProjectTypeService) {}

  @Post()
  create(@Body() createProjectStatusDto: CreateProjectTypeDto) {
    return this.projectTypeService.create(createProjectStatusDto);
  }

  @Get('/findAll')
  findAll() {
    return this.projectTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectTypeService.findOne(+id);
  }

  @Patch()
  update(@Body() updateProjectStatusDto: UpdateProjectTypeDto[]) {
    return this.projectTypeService.update(updateProjectStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectTypeService.remove(id);
  }
}
