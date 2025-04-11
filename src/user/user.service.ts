/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/register.dto';
import { User, UserDocument } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { SessionDocument } from 'src/session/schema/session.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(registerDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(registerDto);
    return newUser.save();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    console.log('email : ', email);
    const result = await this.userModel.findOne({ email }).exec();
    console.log('result : ', result);
    return result;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().populate('sessions').exec();
  }

  async findById(
    id: string,
  ): Promise<UserDocument | null> {
    console.log('session : ', id);
    const result = await this.userModel.findOne({ _id: id }).exec();
    return result;
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
