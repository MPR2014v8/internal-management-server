import { Controller, Get, Post, Body, Delete, Put } from '@nestjs/common';
import { TimeStampService } from './time-stamp.service';
import { CreateTimeStampDto } from './dto/create-time-stamp.dto';
import { TimeStamp } from './schema/time-stamp.schema';

@Controller('time-stamps')
export class TimeStampController {
  constructor(private readonly timeStampService: TimeStampService) {}

  // Create multiple timestamps
  @Post()
  async create(
    @Body() createTimeStampDtos: CreateTimeStampDto[],
  ): Promise<TimeStamp[]> {
    return this.timeStampService.create(createTimeStampDtos);
  }

  // Get all timestamps
  @Get()
  async findAll(): Promise<TimeStamp[]> {
    return this.timeStampService.findAll();
  }

  // Get a single timestamp by ID
  @Post('find-one')
  async findOne(@Body() body: { id: string }): Promise<TimeStamp> {
    return this.timeStampService.findOne(body.id);
  }

  // Get multiple timestamps by a list of IDs
  @Post('find-many')
  async findManyByIds(@Body() body: { ids: string[] }): Promise<TimeStamp[]> {
    return this.timeStampService.findManyByIds(body.ids);
  }

  // Update multiple timestamps
  @Put()
  async update(
    @Body() updateTimeStampDtos: CreateTimeStampDto[],
  ): Promise<TimeStamp[]> {
    return this.timeStampService.update(updateTimeStampDtos);
  }

  // Delete multiple timestamps
  @Delete()
  async remove(@Body() body: { ids: string[] }): Promise<void> {
    return this.timeStampService.remove(body.ids);
  }
}
