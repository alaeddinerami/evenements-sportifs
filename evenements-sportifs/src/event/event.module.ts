import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './entities/event.entity';
import { ParticipantModule } from 'src/participant/participant.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    ParticipantModule,
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
