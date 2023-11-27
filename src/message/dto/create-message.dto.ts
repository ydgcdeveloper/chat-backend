export class CreateMessageDto {
  text: string;
  senderId: number;
  receiverId: number;
  chatId: number | null;
}
