import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateProjectStatusDto } from './dto/create-project-status.dto';
import { UpdateProjectStatusDto } from './dto/update-project-status.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ProjectStatus, ProjectStatusDocument } from './schema/project-status.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class ProjectStatusService implements OnModuleInit {
  constructor(
    @InjectModel(ProjectStatus.name)
    private readonly projectStatusModel: Model<ProjectStatusDocument>,
  ) {}

  async onModuleInit() {
    await this.initializeDefaultStatuses();
  }

  async initializeDefaultStatuses(): Promise<void> {
    const defaultStatuses = ['Backlog', 'In Progress', 'Complete'];

    for (const status of defaultStatuses) {
      const exists = await this.projectStatusModel.exists({ title: status });
      if (!exists) {
        await this.projectStatusModel.create({ title: status });
      }
    }
  }

  async create(dto: CreateProjectStatusDto):Promise<ProjectStatus> {
    const newStatus = new this.projectStatusModel(dto);
    return newStatus.save();
  }

  findAll() {
    return this.projectStatusModel.find().select('_id title').exec()
  }

  findOne(id: number) {
    return `This action returns a #${id} projectStatus`;
  }

  update({_id,...dto}: UpdateProjectStatusDto) {
    return this.projectStatusModel.findByIdAndUpdate(new Types.ObjectId(_id), dto, { new: true }).exec();
  }

  remove(id: string) {
    return this.projectStatusModel.findByIdAndDelete(new Types.ObjectId(id))
  }
}
