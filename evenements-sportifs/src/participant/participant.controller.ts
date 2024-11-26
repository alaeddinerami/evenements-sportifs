import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';



@Controller('participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  createParticipant(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.createParticipant(createParticipantDto);
  }

  @Get()
  findAllParticipant() {
    return this.participantService.findAllParticipant();
  }

  @Get(':id')
  findOneParticipant(@Param('id') id: string) {
    return this.participantService.findOneParticipant(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParticipantDto: UpdateParticipantDto) {
    return this.participantService.update(+id, updateParticipantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.participantService.remove(+id);
  }
}
