import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class EventsConsumer {
  @EventPattern('event_created')
  handleEventCreated(@Payload() data: Record<string, unknown>) {
    console.log('Event received:', data);

    return { status: 'processed', data };
  }
}
