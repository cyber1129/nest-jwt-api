import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { HashService } from './hash.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private hashService: HashService,
  ) {}

  async getUserByUsername(username: string) {
    return this.userModel
      .findOne({
        username,
      })
      .exec();
  }

  async registerUser(createUserDto: CreateUserDto) {
    // check if user exists
    const user = await this.getUserByUsername(createUserDto.username);
    if (user) {
      throw new BadRequestException();
    }
    // Hash Password
    const password = await this.hashService.hashPassword(
      createUserDto.password,
    );

    return this.userModel.create({ ...createUserDto, password });
  }
}
