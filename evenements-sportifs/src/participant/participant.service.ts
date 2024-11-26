import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Participant } from './entities/participant.entity';
import { Model } from 'mongoose';
import { promises } from 'dns';
import { exec } from 'child_process';
import { NotFoundError } from 'rxjs';

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
      .findOne({ email })
      .exec();
    if (existParticipant) {
      throw new ConflictException(`a participent with ${email} already exists`);
    }
    const newParticipant = new this.participantModel(createParticipantDto);
    return newParticipant.save();
  }

  async findAllParticipant() {
    return await this.participantModel.find();
  }

  async findOneParticipant(id: string): Promise<Participant> {
    const participant = await this.participantModel.findById(id);
    if (!participant) {
      throw new NotFoundException(`Participant with id ${id} not found`);
    }
    return participant;
  }

  async updateParticipant(
    id: string,
    updateParticipantDto: UpdateParticipantDto,
  ): Promise<Participant> {
    const updateParticipant = await this.participantModel.findByIdAndUpdate(
      id,
      updateParticipantDto,
    );
    if (!updateParticipant) {
      throw new NotFoundException(`Participant with id ${id} not found`);
    }
    return updateParticipant;
  }

  async removeParticipant(
    id: string,
  ): Promise<{ participant: Participant; message: string }> {
    const deleteParticipant = await this.participantModel.findByIdAndDelete(id);

    if (!deleteParticipant) {
      throw new NotFoundException(`Participant with id ${id} not found`);
    }

    return {
      participant: deleteParticipant,
      message: 'Participant removed successfully',
    };
  }
}
