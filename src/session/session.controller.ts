import { Controller, Get, Post, Body, Delete, Put } from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { Session } from './schema/session.schema';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  // Create multiple sessions
  @Post()
  async create(
    @Body() createSessionDtos: CreateSessionDto[],
  ): Promise<Session[]> {
    return this.sessionService.create(createSessionDtos);
  }

  // Get all sessions
  @Get()
  async findAll(): Promise<Session[]> {
    return this.sessionService.findAll();
  }

  // Get multiple sessions by a list of IDs
  @Post('list') // Using POST to receive an array in the body
  async findManyByIds(@Body() ids: string[]): Promise<Session[]> {
    return this.sessionService.findManyByIds(ids);
  }

  // Update multiple sessions
  @Put()
  async update(
    @Body() updateSessionDtos: CreateSessionDto[],
  ): Promise<Session[]> {
    return this.sessionService.update(updateSessionDtos);
  }

  // Delete multiple sessions
  @Delete()
  async remove(@Body() ids: string[]): Promise<void> {
    return this.sessionService.remove(ids);
  }
}
