import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Types } from 'mongoose';
import { Participant } from 'src/participant/entities/participant.entity';

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  image: string;

  @Prop()
  lacation:string

  @Prop({ type: [Types.ObjectId], ref: 'Participant' , default:[]})
  participants: Participant[];

  @Prop({  type: Date,required: true })
  date: Date;

}
export const EventSchema = SchemaFactory.createForClass(Event);
