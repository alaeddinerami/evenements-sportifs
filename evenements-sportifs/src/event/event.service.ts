import { BadRequestException, Body, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Participant } from 'src/participant/entities/participant.entity';
import { Event } from './entities/event.entity';
import { types } from 'util';

@Injectable()

export class EventService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
    @InjectModel(Participant.name) private participantModel: Model<Participant>,
  ) {}
  async createEvent(
    createEventDto: CreateEventDto,
    image: Express.Multer.File,
  ): Promise<Event> {
    const { participants } = createEventDto;

    if (participants && participants.length > 0) {
      for (const participantId of participants) {
        if (!Types.ObjectId.isValid(participantId)) {
          throw new BadRequestException(
            `Invalid participant ID: ${participantId}`,
          );
        }
      }

      const validParticipants = await this.participantModel
        .find({ _id: { $in: participants } })
        .exec();

      if (validParticipants.length !== participants.length) {
        throw new BadRequestException(
          'Some participants do not exist in the database.',
        );
      }
    }
    const imagePath = image ? `uploads/event-images/${image.filename}` : null;

    const newEvent = new this.eventModel({
      ...createEventDto,
      image: imagePath,
    });
    return newEvent.save();
  }

  async findAllEvent(): Promise<Event[]> {
    return await this.eventModel.find().populate('participants').exec();
  }

  async findOneEvent(id: string):Promise<Event> {    
   const event = await this.eventModel.findById(id).populate('participants')
    if(!event){
      throw new NotFoundException(`event with ${id} not found`)
    }
    return event ;
  }

  async updateEvent(id: string ,@Body() updateEventDto: UpdateEventDto):Promise<Event> {
    
    const updateEvent = await this.eventModel
    .findByIdAndUpdate(id, updateEventDto, { new: true })
    .populate('participants') 
    .exec();
        if(!updateEvent){
      throw new NotFoundException(`event with ${id} not found`)

    }
    return updateEvent;
  }

  async removeEvent(id: string):Promise<{event:Event, message:string}> {
    const deleteEvent = await this.eventModel.findByIdAndDelete(id).exec()
    if(!deleteEvent){
      throw new NotFoundException(`event with ${id} not found`)

    }
    return {event:deleteEvent,
      message:"event created seccussefully"
    };
  }
}
