import { IsEmail, IsString } from 'class-validator';

export class CreateParticipantDto {
  @IsString()
  name: string;

  @IsEmail()
  email:string

  @IsString()
  phone:string
}