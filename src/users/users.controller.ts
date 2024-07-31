import { Controller, Post, Body } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('register')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.registerUser(createUserDto);
  }
}
