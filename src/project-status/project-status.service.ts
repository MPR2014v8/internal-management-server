import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateProjectStatusDto } from './dto/create-project-status.dto';
import { UpdateProjectStatusDto } from './dto/update-project-status.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  ProjectStatus,
  ProjectStatusDocument,
} from './schema/project-status.schema';
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

    for (const [index, status] of defaultStatuses.entries()) {
      const exists = await this.projectStatusModel.exists({ title: status });
      if (!exists) {
      await this.projectStatusModel.create({ title: status, index });
      }
    }
  }

  async create(dto: CreateProjectStatusDto): Promise<ProjectStatus> {
    const lastIndex = await this.findLastIndex()
    const newStatus = new this.projectStatusModel({ index: lastIndex, ...dto });
    return newStatus.save();
  }

  async findLastIndex(){
    return this.projectStatusModel.countDocuments().exec();
  }

  findAll() {
    return this.projectStatusModel.find().select('_id title index').sort({ index: 1 }).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} projectStatus`;
  }

  update(dto: UpdateProjectStatusDto[]) {
    const bulkOperations = dto.map((status) => {
      const updateData: any = {};
      if (status.title) updateData.title = status.title;
      if (status.index !== undefined) updateData.index = status.index;

      return {
      updateOne: {
        filter: { _id: new Types.ObjectId(status._id) },
        update: { $set: updateData },
      },
      };
    }).filter(operation => Object.keys(operation.updateOne.update.$set).length > 0);

    return this.projectStatusModel.bulkWrite(bulkOperations);
  }

  remove(id: string) {
    return this.projectStatusModel.findByIdAndDelete(new Types.ObjectId(id));
  }
}
