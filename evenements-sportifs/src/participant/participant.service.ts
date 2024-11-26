import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Participant } from './entities/participant.entity';
import { Model } from 'mongoose';
import { promises } from 'dns';
import { exec } from 'child_process';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectModel(Participant.name) private participantModel: Model<Participant>,
  ) {}

  async createParticipant(
    createParticipantDto: CreateParticipantDto,
  ): Promise<Participant> {
    const { email } = createParticipantDto;
    const existParticipant = await this.participantModel
      .findOne({ email }).exec()
    if (existParticipant) {
      throw new ConflictException(`a participent with ${email} already exists`);
    }
    const newParticipant = new this.participantModel(createParticipantDto);
    return newParticipant.save();
  }

  async findAllParticipant() {
    return await this.participantModel.find() ;
  }

  findOne(id: number) {
    return `This action returns a #${id} participant`;
  }

  update(id: number, updateParticipantDto: UpdateParticipantDto) {
    return `This action updates a #${id} participant`;
  }

  remove(id: number) {
    return `This action removes a #${id} participant`;
  }
}