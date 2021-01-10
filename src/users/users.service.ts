import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) { }

  async create(createCatDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createCatDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(email: string): Promise<User | null> {
    const userQuery = await this.userModel.findOne({ email }).exec();
    if (userQuery === null) {
      return null;
    }
    const user = userQuery.toObject();
    return { ...user, _id: user._id.toString() };
  }

  async update(_id: string, updateUserDto: UpdateUserDto) {
    const userQuery = await this.userModel.findByIdAndUpdate(_id, updateUserDto, { new: true }).exec();
    if (userQuery === null) {
      throw new HttpException({ status: HttpStatus.FORBIDDEN, error: 'Cant update user...', }, HttpStatus.FORBIDDEN);
    }
    const user = userQuery.toObject();
    return { ...user, _id: user._id.toString() };
  }

  async remove(_id: string) {
    const userQuery = await this.userModel.findByIdAndDelete(_id).exec();
    if (userQuery === null) {
      return null;
    }
    return { result: 'success' };
  }
}
