import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Request } from 'express'; 

@Injectable()
export class UsersService {
  constructor( 
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>, 
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> { 
    return await this.userModel.create(createUserDto); 
  }

  async findAll(request: Request): Promise<User[]> { 
    return await this.userModel
      .find(request.query) 
      .setOptions({ sanitizeFilter: true }) 
      .exec();
  }

  async findOne(id: string): Promise<User | null> { 
    return await this.userModel.findById(id).exec(); 
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> { 
    return await this.userModel.findOneAndUpdate({ _id: id }, updateUserDto, { 
      new: true, 
    });
  }

  async remove(id: string) { 
    return await this.userModel.findByIdAndDelete({ _id: id }).exec(); 
  }
}