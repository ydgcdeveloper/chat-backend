import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { PusherService } from './services/pusher/pusher.service';
import { MessageModule } from './message/message.module';
import { ChannelModule } from './channel/channel.module';

@Module({
  imports: [UserModule, AuthModule, ChatModule, MessageModule, ChannelModule],
  controllers: [AppController],
  providers: [AppService, PusherService],
})
export class AppModule {}
