import { Injectable } from '@nestjs/common';
import { CreateProjectTypeDto } from './dto/create-project-type.dto';
import { UpdateProjectTypeDto } from './dto/update-project-type.dto';
import { ProjectType, ProjectTypeDocument } from './schema/project-type.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProjectTypeService {  constructor(
    @InjectModel(ProjectType.name)
    private readonly projectTypeModel: Model<ProjectTypeDocument>,
  ) {}

  // async onModuleInit() {
  //   await this.initializeDefaultTypees();
  // }

  // async initializeDefaultTypees(): Promise<void> {
  //   const defaultTypees = ['Semi-Custom', 'Full-Custom'];

  //   for (const [index, Type] of defaultTypees.entries()) {
  //     const exists = await this.projectTypeModel.exists({ title: Type });
  //     if (!exists) {
  //     await this.projectTypeModel.create({ title: Type, index });
  //     }
  //   }
  // }

  async create(dto: CreateProjectTypeDto): Promise<ProjectType> {
    const lastIndex = await this.findLastIndex()
    const newType = new this.projectTypeModel({ index: lastIndex, ...dto });
    return newType.save();
  }

  async findLastIndex(){
    return this.projectTypeModel.countDocuments().exec();
  }

  findAll() {
    return this.projectTypeModel.find().select('_id title index').sort({ index: 1 }).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} projectType`;
  }

  update(dto: UpdateProjectTypeDto[]) {
    const bulkOperations = dto.map((Type) => {
      const updateData: any = {};
      if (Type.title) updateData.title = Type.title;
      if (Type.index !== undefined) updateData.index = Type.index;

      return {
      updateOne: {
        filter: { _id: new Types.ObjectId(Type._id) },
        update: { $set: updateData },
      },
      };
    }).filter(operation => Object.keys(operation.updateOne.update.$set).length > 0);

    return this.projectTypeModel.bulkWrite(bulkOperations);
  }

  remove(id: string) {
    return this.projectTypeModel.findByIdAndDelete(new Types.ObjectId(id));
  }}
