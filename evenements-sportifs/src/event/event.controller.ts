import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ImageUploadInterceptor } from 'src/middleware/multer.middleware';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('event')
@UseGuards(AuthGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}


 
 @Post()
  @UseInterceptors(ImageUploadInterceptor())
  async createEvent(
    @Body() createEventDto: CreateEventDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.eventService.createEvent(createEventDto, image);
  }
  @Get()
  findAll() {
    return this.eventService.findAllEvent();
  }

  @Get(':id')
  findOneEvent(@Param('id') id: string) {
    return this.eventService.findOneEvent(id);
  }

  @Patch(':id')
  @UseInterceptors(ImageUploadInterceptor())
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.updateEvent(id, updateEventDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.removeEvent(id);
  }
}
