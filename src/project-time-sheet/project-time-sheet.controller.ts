import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectTimeSheetService } from './project-time-sheet.service';
import { CreateProjectTimeSheetDto } from './dto/create-project-time-sheet.dto';
import { UpdateProjectTimeSheetDto } from './dto/update-project-time-sheet.dto';

@Controller('project-time-sheet')
export class ProjectTimeSheetController {
  constructor(private readonly projectTimeSheetService: ProjectTimeSheetService) {}

  @Post()
  create(@Body() createProjectTimeSheetDto: CreateProjectTimeSheetDto) {
    return this.projectTimeSheetService.create(createProjectTimeSheetDto);
  }

  @Get()
  findAll() {
    return this.projectTimeSheetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectTimeSheetService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectTimeSheetDto: UpdateProjectTimeSheetDto) {
    return this.projectTimeSheetService.update(+id, updateProjectTimeSheetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectTimeSheetService.remove(+id);
  }
}
