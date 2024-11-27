import { Type } from "class-transformer";
import { IsArray, IsDate, IsOptional, isString, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateEventDto {
    @IsString()
    name: string;
  
    @IsString()
    description: string;
  
    @IsString()
    location: string;
  
    @IsString()
    // @Type(() => Date)
    date: String;
  
    @IsOptional()
    @IsArray()
    participants?: Types.ObjectId[];
}
