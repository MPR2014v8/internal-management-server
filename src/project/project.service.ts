import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Project, ProjectDocument } from './schema/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) { }

  // Create multiple projects
  async create(createProjectDtos: CreateProjectDto[]): Promise<Project[]> {
    const projects = createProjectDtos.map((dto) => ({
      ...dto,
      statusId: dto.statusId
        ? new Types.ObjectId(dto.statusId)
        : null,
      projectManager: dto.projectManager
        ? new Types.ObjectId(dto.projectManager)
        : null,
      businessanalystLead: dto.businessanalystLead
        ? new Types.ObjectId(dto.businessanalystLead)
        : null,
      developerLead: dto.developerLead
        ? new Types.ObjectId(dto.developerLead)
        : null,
    }));

    try {
      const newProjects = await this.projectModel.insertMany(projects);
      return this.projectModel
        .find({ _id: { $in: newProjects.map((t) => t._id) } })
        .lean()
        .exec();
    } catch (error) {
      throw new Error(`Error creating projects: ${error.message}`);
    }
  }

  // Get all projects
  async findAll(): Promise<Project[]> {
    return this.projectModel.find().lean().exec();
  }

  async getCard() {
    const card = await this.projectModel.aggregate([
      {
      $lookup: {
        from: 'users',
        let: { userId: '$projectManager' },
        pipeline: [
        { $match: { $expr: { $eq: ['$_id', '$$userId'] } } },
        { $project: { _id: 1, name: 1 } },
        ],
        as: 'projectManager',
      },
      },
      { $unwind: { path: '$projectManager', preserveNullAndEmptyArrays: true } },
      {
      $lookup: {
        from: 'users',
        let: { userId: '$businessanalystLead' },
        pipeline: [
        { $match: { $expr: { $eq: ['$_id', '$$userId'] } } },
        { $project: { _id: 1, name: 1 } },
        ],
        as: 'businessanalystLead',
      },
      },
      { $unwind: { path: '$businessanalystLead', preserveNullAndEmptyArrays: true } },
      {
      $lookup: {
        from: 'users',
        let: { userId: '$developerLead' },
        pipeline: [
        { $match: { $expr: { $eq: ['$_id', '$$userId'] } } },
        { $project: { _id: 1, name: 1 } },
        ],
        as: 'developerLead',
      },
      },
      { $unwind: { path: '$developerLead', preserveNullAndEmptyArrays: true } },
      {
      $lookup: {
        from: 'projectmembers',
        localField: '_id',
        foreignField: 'project',
        as: 'members',
      },
      },
      {
      $lookup: {
        from: 'users',
        let: { members: '$members' },
        pipeline: [
        {
          $match: {
          $expr: {
            $in: ['$_id', { $map: { input: '$$members', as: 'm', in: '$$m.user' } }],
          },
          },
        },
        {
          $addFields: {
          role: {
            $first: {
            $map: {
              input: {
              $filter: {
                input: '$$members',
                as: 'pm',
                cond: { $eq: ['$$pm.user', '$_id'] },
              },
              },
              as: 'matched',
              in: '$$matched.role',
            },
            },
          },
          },
        },
        ],
        as: 'users',
      },
      },
      {
      $project: {
        _id: 1,
        name: { $ifNull: ['$name', ''] },
        type: { $ifNull: ['$type', ''] },
        description: { $ifNull: ['$description', ''] },
        statusId: { $ifNull: ['$statusId', ''] },
        startDate: { $ifNull: ['$startDate', null] },
        dueDate: { $ifNull: ['$dueDate', null] },
        createdAt: { $ifNull: ['$createdAt', ''] },
        updatedAt: { $ifNull: ['$updatedAt', ''] },
        projectManager: { $ifNull: ['$projectManager', { _id: 'Unknown', name: 'Not yet determined.' }] },
        businessanalystLead: { $ifNull: ['$businessanalystLead', { _id: 'Unknown', name: 'Not yet determined.' }] },
        developerLead: { $ifNull: ['$developerLead', { _id: 'Unknown', name: 'Not yet determined.' }] },
        users: { $ifNull: ['$users', []] },
      },
      },
    ]);
    return card;
  }

  // Get a single project by ID// Service - findOne method
  async findOne(id: string): Promise<Project> {
    const project = await this.projectModel.findById(id).lean().exec();

    if (!project) {
      throw new Error(`Project with ID ${id} not found`);
    }

    return project;
  }

  // Get multiple projects by IDs
  async findManyByIds(ids: string[]): Promise<Project[]> {
    const objectIds = ids.map((id) => new Types.ObjectId(id));
    return this.projectModel
      .find({ _id: { $in: objectIds } })
      .lean()
      .exec();
  }

  // Update multiple projects
  async update(updateProjectDtos: CreateProjectDto[]): Promise<Project[]> {
    const updatedProjects: Project[] = [];

    for (const dto of updateProjectDtos) {
      const updated = await this.projectModel
        .findOneAndUpdate(
          { _id: new Types.ObjectId(dto._id) },
          {
            name: dto.name,
            type: dto.type,
            description: dto.description,
            statusId: dto.statusId
              ? new Types.ObjectId(dto.statusId)
              : null,
            startDate: dto.startDate,
            dueDate: dto.dueDate,
            projectManager: dto.projectManager
              ? new Types.ObjectId(dto.projectManager)
              : null,
            businessanalystLead: dto.businessanalystLead
              ? new Types.ObjectId(dto.businessanalystLead)
              : null,
            developerLead: dto.developerLead
              ? new Types.ObjectId(dto.developerLead)
              : null,
          },
          { new: true }, // Return the updated document
        )
        .lean()
        .exec();

      if (!updated) {
        throw new Error(`Project with ID ${dto._id} not found`);
      }

      updatedProjects.push(updated);
    }

    return updatedProjects;
  }

  // Delete multiple projects by IDs
  async remove(ids: string[]): Promise<void> {
    const objectIds = ids.map((id) => new Types.ObjectId(id));
    const result = await this.projectModel
      .deleteMany({ _id: { $in: objectIds } })
      .exec();

    if (result.deletedCount === 0) {
      throw new Error('No projects were deleted');
    }
  }
}
