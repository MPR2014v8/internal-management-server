import { Controller, Get, Post, Body, Delete, Put } from '@nestjs/common';
import { ProjectTimeSheetService } from './project-time-sheet.service';
import { CreateProjectTimeSheetDto } from './dto/create-project-time-sheet.dto';
import { ProjectTimeSheet } from './schema/project-time-sheet.schema';

@Controller('project-timesheets')
export class ProjectTimeSheetController {
  constructor(
    private readonly projectTimeSheetService: ProjectTimeSheetService,
  ) {}

  // Create multiple project timesheets
  @Post('/create')
  async create(
    @Body() createTimeSheetDtos: CreateProjectTimeSheetDto[],
  ): Promise<ProjectTimeSheet[]> {
    return this.projectTimeSheetService.create(createTimeSheetDtos);
  }

  // Get all project timesheets
  @Get('/findAll')
  async findAll(): Promise<ProjectTimeSheet[]> {
    return this.projectTimeSheetService.findAll();
  }

  @Post('/findOnd')
  async find(@Body() req): Promise<ProjectTimeSheet>{
    const { id } = req;
    return this.projectTimeSheetService.find(id)
  }

  // Get multiple project timesheets by a list of IDs
  @Post('/findMany') // Using POST to receive an array in the body
  async findManyByIds(@Body() ids: string[]): Promise<ProjectTimeSheet[]> {
    return this.projectTimeSheetService.findManyByIds(ids);
  }

  // Update multiple project timesheets
  @Put('/update')
  async update(
    @Body() updateTimeSheetDtos: CreateProjectTimeSheetDto[],
  ): Promise<ProjectTimeSheet[]> {
    return this.projectTimeSheetService.update(updateTimeSheetDtos);
  }

  // Delete multiple project timesheets
  @Delete('/delete')
  async remove(@Body() ids: string[]): Promise<void> {
    return this.projectTimeSheetService.remove(ids);
  }
}
