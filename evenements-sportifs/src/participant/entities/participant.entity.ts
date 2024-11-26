import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsString } from "class-validator";
import { Document } from "mongoose";
import { timestamp } from "rxjs";

@Schema({timestamps:true})
export class Participant extends Document {
    @Prop({required: true})
    name:string

    @Prop({required:true, unique:true})
    email:string

    @Prop()
    phone: string

}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);