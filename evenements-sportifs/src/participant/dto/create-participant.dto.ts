import { IsEmail, IsEnum, IsString } from 'class-validator';

export class CreateParticipantDto {
  @IsString()
  name: string;

  @IsEmail()
  email:string

  @IsString()
  phone:string

  @IsEnum(['admin','client'])
  genre:String
}