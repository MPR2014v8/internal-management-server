import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ProjectTimeSheet,
  ProjectTimeSheetDocument,
} from './schema/project-time-sheet.schema';
import { CreateProjectTimeSheetDto } from './dto/create-project-time-sheet.dto';

@Injectable()
export class ProjectTimeSheetService {
  constructor(
    @InjectModel(ProjectTimeSheet.name)
    private readonly projectTimeSheetModel: Model<ProjectTimeSheetDocument>,
  ) {}

  // Create a new project time sheet entry
  async create(
    createProjectTimeSheetDto: CreateProjectTimeSheetDto,
  ): Promise<ProjectTimeSheet> {
    const createdProjectTimeSheet = new this.projectTimeSheetModel(
      createProjectTimeSheetDto,
    );
    return await createdProjectTimeSheet.save();
  }

  // Find all project time sheets
  async findAll(): Promise<ProjectTimeSheet[]> {
    return this.projectTimeSheetModel.find().exec();
  }

  // Find a single project time sheet by ID
  async findOne(id: string): Promise<ProjectTimeSheet> {
    const projectTimeSheet = await this.projectTimeSheetModel
      .findById(id)
      .exec();
    if (!projectTimeSheet) {
      throw new NotFoundException(`ProjectTimeSheet with id ${id} not found`);
    }
    return projectTimeSheet;
  }

  // Update an existing project time sheet
  async update(
    id: string,
    updateProjectTimeSheetDto: CreateProjectTimeSheetDto,
  ): Promise<ProjectTimeSheet> {
    const updatedProjectTimeSheet = await this.projectTimeSheetModel
      .findByIdAndUpdate(id, updateProjectTimeSheetDto, { new: true })
      .exec();
    if (!updatedProjectTimeSheet) {
      throw new NotFoundException(`ProjectTimeSheet with id ${id} not found`);
    }
    return updatedProjectTimeSheet;
  }

  // Delete a project time sheet
  async remove(id: string): Promise<void> {
    const result = await this.projectTimeSheetModel
      .deleteOne({ _id: id })
      .exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`ProjectTimeSheet with id ${id} not found`);
    }
  }
}
