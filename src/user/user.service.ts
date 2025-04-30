/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/register.dto';
import { User, UserDocument } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { SessionDocument } from 'src/session/schema/session.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(registerDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(registerDto);
    return newUser.save();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    const result = await this.userModel.findOne({ email }).exec();
    return result;
  }

  async getAllUsers(): Promise<UserDocument[]> {
    return this.userModel.find().select('-password').exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    console.log('session : ', id);
    const result = await this.userModel.findOne({ _id: id }).exec();
    return result;
  }

  async findByIds(ids:string[]): Promise<UserDocument[]>{
      const objectIds = ids.map((id) => new Types.ObjectId(id));
      return this.userModel
        .find({ _id: { $in: objectIds } })
        .lean()
        .exec();
  }

  // ยังไม่เสร็จ
  async update(updateUserDtos: UpdateUserDto[]): Promise<UserDocument[]> {
    const updatedUsers: UserDocument[] = [];

    for (const dto of updateUserDtos) {
      const updated = await this.userModel
        .findOneAndUpdate(
          { _id: new Types.ObjectId(dto._id) },
          {
            email: dto.email,
            name: dto.name,
            isActive: dto.isActive,
          },
          { new: true }, // Return the updated document
        )
        .lean()
        .exec();

      if (!updated) {
        throw new Error(`User with ID ${dto._id} not found`);
      }

      updatedUsers.push(updated);
    }

    return updatedUsers;
  }

  async removeSession(userId: string, sessionId: string) {
    await this.userModel
      .findByIdAndUpdate(userId, { $pull: { sessions: sessionId } })
      .exec();
    return `This action removes a #${sessionId} session`;
  }

  // Deactivate user by setting 'isActive' to 'false'
  async deactivateUser(userId: string): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { isActive: 'false' }, // Setting isActive to 'false'
      { new: true }, // Returns the updated user
    );

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return updatedUser;
  }

  // Remove user permanently from the database
  async removeUser(userId: string): Promise<{ message: string }> {
    await this.userModel.findByIdAndDelete(userId);
    return { message: 'User removed successfully' };
  }
}
