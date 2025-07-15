import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { EventsService } from './events.service';
import { ApiBody } from '@nestjs/swagger';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        payload: { type: 'string' },
      },
    },
  })
  create(@Body() payload: Record<string, unknown>) {
    return this.eventsService.create(payload);
  }
}
