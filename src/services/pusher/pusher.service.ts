import { Injectable } from '@nestjs/common';
import * as Pusher from 'pusher';

@Injectable()
export class PusherService {
  pusher: Pusher;

  constructor() {
    this.pusher = new Pusher({
      appId: '1714348',
      key: '7dd4184262299fe7e1ef',
      secret: '0824578c1feaff1cd5d6',
      cluster: 'us2',
      useTLS: true,
    });
  }

  async trigger(channel: string, event: string, data: any) {
    await this.pusher.trigger(channel, event, data);
  }
}
