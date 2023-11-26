import { ChatMessage, User } from '@prisma/client';

export class CreateChatDto {
  description?: string;
  type?: string; // personal | group
}
