import { Injectable } from '@nestjs/common';
import { CreateTimeStampDto } from './dto/create-time-stamp.dto';
import { UpdateTimeStampDto } from './dto/update-time-stamp.dto';

@Injectable()
export class TimeStampService {
  create(createTimeStampDto: CreateTimeStampDto) {
    return 'This action adds a new timeStamp';
  }

  findAll() {
    return `This action returns all timeStamp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} timeStamp`;
  }

  update(id: number, updateTimeStampDto: UpdateTimeStampDto) {
    return `This action updates a #${id} timeStamp`;
  }

  remove(id: number) {
    return `This action removes a #${id} timeStamp`;
  }
}
