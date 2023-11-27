import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaService } from 'src/services/prisma.service';
import { ChatService } from 'src/chat/chat.service';

@Injectable()
export class MessageService {
  constructor(
    private prismaService: PrismaService,
    private chatService: ChatService,
  ) {}
  async create(createMessageDto: CreateMessageDto) {
    const messageCreated = await this.prismaService.chatMessage.create({
      data: {
        text: createMessageDto.text,
        sender: { connect: { id: createMessageDto.senderId } },
        receiver: { connect: { id: createMessageDto.receiverId } },
        chat: {
          connectOrCreate: {
            where: { id: createMessageDto?.chatId ?? 0.2 },
            create: {
              channel: { create: { name: `new-chat-${Date.now()}` } },
              participants: {
                connect: [
                  { id: createMessageDto.senderId },
                  { id: createMessageDto.receiverId },
                ],
              },
            },
          },
        },
      },
      include: {
        chat: {
          include: { chatMessage: {}, participants: {} },
        },
      },
    });
    return messageCreated;
  }

  findAll() {
    return `This action returns all message`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
