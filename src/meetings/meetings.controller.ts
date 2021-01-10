import { Controller, Get, Param } from '@nestjs/common';
import { MeetingsService } from './meetings.service';
@Controller('meetings')
export class MeetingsController {
  constructor(private readonly meetingsService: MeetingsService) {}

  @Get()
  findAll() {
    return this.meetingsService.findAll();
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.meetingsService.findOne(email);
  }

}
