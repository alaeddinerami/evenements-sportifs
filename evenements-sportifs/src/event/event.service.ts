import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Participant } from 'src/participant/entities/participant.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
    @InjectModel(Participant.name) private participantModel: Model<Participant>,
  ) {}
  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const { participants } = createEventDto;
    for (const participantId of participants) {
      if (!Types.ObjectId.isValid(participantId)) {
        throw new BadRequestException(`Invalid participant ID: ${participantId}`);
      }}
    if (participants && participants.length > 0) {
      const validParticipants = await this.participantModel
        .find({ _id: { $in: participants } })
        .exec();

      if (validParticipants.length !== participants.length) {
        throw new BadRequestException(
          'Some participants do not exist in the database.',
        );
      }
    }
    const newEvent = new this.eventModel(createEventDto);
    return newEvent.save();
  }

  findAll() {
    return `This action returns all event`;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
