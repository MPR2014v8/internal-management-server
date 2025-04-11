import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  ProjectTimeSheet,
  ProjectTimeSheetDocument,
} from './schema/project-time-sheet.schema';
import { CreateProjectTimeSheetDto } from './dto/create-project-time-sheet.dto';

@Injectable()
export class ProjectTimeSheetService {
  constructor(
    @InjectModel(ProjectTimeSheet.name)
    private readonly timeSheetModel: Model<ProjectTimeSheetDocument>,
  ) {}

  // Create multiple project timesheets
  async create(
    createTimeSheetDtos: CreateProjectTimeSheetDto[],
  ): Promise<ProjectTimeSheet[]> {
    const timeSheets = createTimeSheetDtos.map((dto) => ({
      ...dto,
      user: new Types.ObjectId(dto.user),
      project: new Types.ObjectId(dto.project),
    }));

    try {
      const newTimeSheets = await this.timeSheetModel.insertMany(timeSheets);
      return this.timeSheetModel
        .find({ _id: { $in: newTimeSheets.map((t) => t._id) } })
        .lean()
        .exec();
    } catch (error) {
      throw new Error(`Error creating project timesheets: ${error.message}`);
    }
  }

  // Get all project timesheets
  async findAll(): Promise<ProjectTimeSheet[]> {
    return this.timeSheetModel.find().lean().exec();
  }

  // Get project timesheets by a list of IDs
  async findManyByIds(ids: string[]): Promise<ProjectTimeSheet[]> {
    const objectIds = ids.map((id) => new Types.ObjectId(id));
    return this.timeSheetModel
      .find({ _id: { $in: objectIds } })
      .lean()
      .exec();
  }

  // Update multiple project timesheets
  async update(
    updateTimeSheetDtos: CreateProjectTimeSheetDto[],
  ): Promise<ProjectTimeSheet[]> {
    const updatedTimeSheets: ProjectTimeSheet[] = [];

    for (const dto of updateTimeSheetDtos) {
      const updated = await this.timeSheetModel
        .findOneAndUpdate(
          {
            user: new Types.ObjectId(dto.user),
            project: new Types.ObjectId(dto.project),
          },
          {
            task: dto.task,
            remark: dto.remark,
            time: dto.time,
          },
          { new: true }, // Return the updated document
        )
        .lean()
        .exec();

      if (!updated) {
        throw new Error(
          `Project timesheet with user ${dto.user} and project ${dto.project} not found`,
        );
      }

      updatedTimeSheets.push(updated);
    }

    return updatedTimeSheets;
  }

  // Delete multiple project timesheets by IDs
  async remove(ids: string[]): Promise<void> {
    const objectIds = ids.map((id) => new Types.ObjectId(id));
    const result = await this.timeSheetModel
      .deleteMany({ _id: { $in: objectIds } })
      .exec();

    if (result.deletedCount === 0) {
      throw new Error('No project timesheets were deleted');
    }
  }
}
