import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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

  // Create multiple project members
  async create(
    createProjectMemberDtos: CreateProjectMemberDto[],
  ): Promise<ProjectMember[]> {
    const projectMembers = createProjectMemberDtos.map((dto) => ({
      ...dto,
      user: new Types.ObjectId(dto.user),
      project: new Types.ObjectId(dto.project),
    }));

    try {
      const newProjectMembers =
        await this.projectMemberModel.insertMany(projectMembers);
      return this.projectMemberModel
        .find({ _id: { $in: newProjectMembers.map((t) => t._id) } })
        .lean()
        .exec();
    } catch (error) {
      throw new Error(`Error creating project members: ${error.message}`);
    }
  }

  // Get all project members
  async findAll(): Promise<ProjectMember[]> {
    return this.projectMemberModel.find().lean().exec();
  }

  async findOne(id: string): Promise<ProjectMember> {
    const projectMember = await this.projectMemberModel.findOne({ _id: id }).lean().exec();
    if (!projectMember) {
      throw new Error(`Project Member with ID ${id} not found`);
    }
    return projectMember;
  }

  // Get multiple project members by a list of IDs
  async findManyByIds(ids: string[]): Promise<ProjectMember[]> {
    const objectIds = ids.map((id) => new Types.ObjectId(id));
    return this.projectMemberModel
      .find({ _id: { $in: objectIds } })
      .lean()
      .exec();
  }

  // Update multiple project members
  async update(
    updateProjectMemberDtos: CreateProjectMemberDto[],
  ): Promise<ProjectMember[]> {
    const updatedProjectMembers: ProjectMember[] = [];

    for (const dto of updateProjectMemberDtos) {
      const updated = await this.projectMemberModel
        .findOneAndUpdate(
          {
            user: new Types.ObjectId(dto.user),
            project: new Types.ObjectId(dto.project),
          },
          {
            role: dto.role,
          },
          { new: true }, // Return the updated document
        )
        .lean()
        .exec();

      if (!updated) {
        throw new Error(
          `Project member with user ${dto.user} and project ${dto.project} not found`,
        );
      }

      updatedProjectMembers.push(updated);
    }

    return updatedProjectMembers;
  }

  // Delete multiple project members by IDs
  async remove(ids: string[]): Promise<void> {
    const objectIds = ids.map((id) => new Types.ObjectId(id));
    const result = await this.projectMemberModel
      .deleteMany({ _id: { $in: objectIds } })
      .exec();

    if (result.deletedCount === 0) {
      throw new Error('No project members were deleted');
    }
  }
}
