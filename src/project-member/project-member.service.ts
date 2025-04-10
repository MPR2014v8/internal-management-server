import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ProjectMember,
  ProjectMemberDocument,
} from './schema/project-member.schema';
import { CreateProjectMemberDto } from './dto/create-project-member.dto';

@Injectable()
export class ProjectMemberService {
  constructor(
    @InjectModel(ProjectMember.name)
    private readonly projectMemberModel: Model<ProjectMemberDocument>,
  ) {}

  // Create a new project member
  async create(
    createProjectMemberDto: CreateProjectMemberDto,
  ): Promise<ProjectMember> {
    const createdProjectMember = new this.projectMemberModel(
      createProjectMemberDto,
    );
    return await createdProjectMember.save();
  }

  // Find all project members
  async findAll(): Promise<ProjectMember[]> {
    return this.projectMemberModel.find().exec();
  }

  // Find a single project member by ID
  async findOne(id: string): Promise<ProjectMember> {
    const projectMember = await this.projectMemberModel.findById(id).exec();
    if (!projectMember) {
      throw new NotFoundException(`ProjectMember with id ${id} not found`);
    }
    return projectMember;
  }

  // Update an existing project member
  async update(
    id: string,
    updateProjectMemberDto: CreateProjectMemberDto,
  ): Promise<ProjectMember> {
    const updatedProjectMember = await this.projectMemberModel
      .findByIdAndUpdate(id, updateProjectMemberDto, { new: true })
      .exec();
    if (!updatedProjectMember) {
      throw new NotFoundException(`ProjectMember with id ${id} not found`);
    }
    return updatedProjectMember;
  }

  // Delete a project member
  async remove(id: string): Promise<void> {
    const result = await this.projectMemberModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`ProjectMember with id ${id} not found`);
    }
  }
}
