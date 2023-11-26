import { PrismaService } from './../services/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const password = await bcrypt.hash(createUserDto.password, 10);
    createUserDto = { ...createUserDto, password };
    const createdUser = await this.prisma.user.create({ data: createUserDto });
    const { password: _, ...userWithoutPassword } = createdUser;
    return userWithoutPassword;
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findAvailableUsers(currentUser: any): Promise<User[]> {
    const currentUserId = currentUser.sub;
    return this.prisma.user.findMany({
      where: {
        id: {
          not: currentUserId,
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({ where: { username } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return;
    }
    const { password, ...result } = user;
    return result;
  }
}
