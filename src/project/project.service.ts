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
  ) {}

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

  async getCard():Promise<Project[]>{
    
    return this.projectModel.find().populate(['projectManager', 'businessanalystLead', 'developerLead'], ['-password','-__v']).lean().exec();
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
