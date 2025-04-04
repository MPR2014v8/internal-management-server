import { Injectable } from '@nestjs/common';
import { CreateProjectTimeSheetDto } from './dto/create-project-time-sheet.dto';
import { UpdateProjectTimeSheetDto } from './dto/update-project-time-sheet.dto';

@Injectable()
export class ProjectTimeSheetService {
  create(createProjectTimeSheetDto: CreateProjectTimeSheetDto) {
    return 'This action adds a new projectTimeSheet';
  }

  findAll() {
    return `This action returns all projectTimeSheet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} projectTimeSheet`;
  }

  update(id: number, updateProjectTimeSheetDto: UpdateProjectTimeSheetDto) {
    return `This action updates a #${id} projectTimeSheet`;
  }

  remove(id: number) {
    return `This action removes a #${id} projectTimeSheet`;
  }
}
