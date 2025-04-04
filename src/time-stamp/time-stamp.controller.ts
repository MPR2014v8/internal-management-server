import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TimeStampService } from './time-stamp.service';
import { CreateTimeStampDto } from './dto/create-time-stamp.dto';
import { UpdateTimeStampDto } from './dto/update-time-stamp.dto';

@Controller('time-stamp')
export class TimeStampController {
  constructor(private readonly timeStampService: TimeStampService) {}

  @Post()
  create(@Body() createTimeStampDto: CreateTimeStampDto) {
    return this.timeStampService.create(createTimeStampDto);
  }

  @Get()
  findAll() {
    return this.timeStampService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timeStampService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTimeStampDto: UpdateTimeStampDto) {
    return this.timeStampService.update(+id, updateTimeStampDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeStampService.remove(+id);
  }
}
