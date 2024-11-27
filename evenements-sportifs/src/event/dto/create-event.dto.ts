import { Type } from "class-transformer";
import { IsArray, IsDate, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateEventDto {
    @IsString()
    name: string;
  
    @IsString()
    description: string;
  
    @IsString()
    image: string;

    @IsString()
    location: string;
  
    @IsDate()
    @Type(() => Date)
    date: Date;
  
    @IsOptional()
    @IsArray()
    participants?: Types.ObjectId[];
}
