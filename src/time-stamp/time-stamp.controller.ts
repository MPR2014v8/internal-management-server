// src/time-stamp/time-stamp.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TimeStampService } from './time-stamp.service';
import { CreateTimeStampDto } from './dto/create-time-stamp.dto';
import { UpdateTimeStampDto } from './dto/update-time-stamp.dto';
import { TimeStamp } from './schema/time-stamp.schema';

@Controller('time-stamps')
export class TimeStampController {
  constructor(private readonly timeStampService: TimeStampService) {}

  // Create a new TimeStamp
  @Post()
  async create(
    @Body() createTimeStampDto: CreateTimeStampDto,
  ): Promise<TimeStamp> {
    return this.timeStampService.create(createTimeStampDto);
  }

  // Get all TimeStamps
  @Get()
  async findAll(): Promise<TimeStamp[]> {
    return this.timeStampService.findAll();
  }

  // Get a specific TimeStamp by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TimeStamp> {
    return this.timeStampService.findOne(id);
  }

  // Update an existing TimeStamp
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTimeStampDto: UpdateTimeStampDto,
  ): Promise<TimeStamp> {
    return this.timeStampService.update(id, updateTimeStampDto);
  }

  // Delete a TimeStamp
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.timeStampService.remove(id);
  }
}
