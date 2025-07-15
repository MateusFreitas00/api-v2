import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class EventsService {
  constructor(@Inject('EVENT_SERVICE') private readonly client: ClientProxy) {}

  create(payload: Record<string, unknown>) {
    this.client.emit('event_created', payload);
    return { message: 'Event emitted successfully', payload };
  }
}
