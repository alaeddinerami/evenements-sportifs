import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { Participant } from './entities/participant.entity';
import { AuthGuard } from 'src/guards/auth.guard';



@Controller('participant')
@UseGuards(AuthGuard)
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  createParticipant(@Body() createParticipantDto: CreateParticipantDto):Promise<Participant> {
    return this.participantService.createParticipant(createParticipantDto);
  }

  @Get()
  findAllParticipant():Promise<Participant[]> {
    return this.participantService.findAllParticipant();
  }

  @Get(':id')
  findOneParticipant(@Param('id') id: string):Promise<Participant> {
    return this.participantService.findOneParticipant(id);
  }

  @Patch(':id')
  updateParticipant(@Param('id') id: string, @Body() updateParticipantDto: UpdateParticipantDto):Promise<Participant> {
    return this.participantService.updateParticipant(id, updateParticipantDto);
  }

  @Delete(':id')
  removeParticipant(@Param('id') id: string):Promise<{ participant: Participant; message: string }> {
    return this.participantService.removeParticipant(id);
  }
}
