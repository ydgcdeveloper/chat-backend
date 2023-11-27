import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public, Roles } from 'src/decorators/decorators';
import { Role, User } from '@prisma/client';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Public()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles(Role.USER)
  findAll(@CurrentUser() currentUser: User) {
    console.log(currentUser);
    return this.userService.findAll();
  }

  @Get('available')
  getAvailableUsers(@CurrentUser() currentUser: User) {
    return this.userService.findAvailableUsers(currentUser);
  }

  @Get('user_loggued')
  getUserLoggued(@CurrentUser() currentUser) {
    return this.userService.findById(currentUser.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
