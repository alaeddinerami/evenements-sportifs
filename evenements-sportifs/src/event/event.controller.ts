import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ImageUploadInterceptor } from 'src/middleware/multer.middleware';

@Controller('event')
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
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(+id, updateEventDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}
