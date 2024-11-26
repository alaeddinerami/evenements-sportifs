import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsDate, IsString } from "class-validator";
import { Date, Types } from "mongoose";

@Schema({timestamps:true})
export class Event {
    @Prop({required:true})
    name:string

    @Prop({required:true})
    description:string

    @Prop({required:true})
    image:string

    @Prop({type:[{type:Types.ObjectId, ref:'Participant'}]})
    participants: Types.ObjectId[]

    @Prop({required:true})
    date:Date

}
export const EventSchema = SchemaFactory.createForClass(Event)
