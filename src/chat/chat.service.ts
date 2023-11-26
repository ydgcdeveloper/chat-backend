import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { PrismaService } from 'src/services/prisma.service';
import { createChatGroupDto } from './dto/create-chat-group.dto';

@Injectable()
export class ChatService {
  constructor(private prismaService: PrismaService) {}
  create(createChatDto: CreateChatDto) {
    return this.prismaService.chat.create({
      data: {
        channel: { create: { name: `new-chat-${Date.now()}` } },
      },
    });
  }

  async createChat(createChatGroupDto: createChatGroupDto) {
    const chat = await this.create(null);
    return this.update(chat.id, createChatGroupDto);
  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    const arrayIdParticipants: { id: number }[] =
      updateChatDto?.participants.map((item) => {
        return { id: item };
      });

    const arrayIdChatMessage: { id: number }[] =
      updateChatDto?.chatMessage?.map((item) => {
        return { id: item };
      });

    return this.prismaService.chat.update({
      data: {
        ...updateChatDto,
        participants: { connect: arrayIdParticipants },
        chatMessage: { connect: arrayIdChatMessage },
      },
      where: { id },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
