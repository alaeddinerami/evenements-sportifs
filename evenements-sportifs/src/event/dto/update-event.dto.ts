import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';
import { Types } from 'mongoose';

export class UpdateEventDto extends PartialType(CreateEventDto) {
 
  name?: string;

  description?: string;

  location?: string;

  participants?: Types.ObjectId[];

  date?: Date;
}
