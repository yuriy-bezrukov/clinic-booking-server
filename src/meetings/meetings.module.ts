import { Module } from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { MeetingsGateway } from './meetings.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Meeting, MeetingSchema } from './schemas/meeting.schema';
import { MeetingsController } from './meetings.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Meeting.name, schema: MeetingSchema }])],
  providers: [MeetingsGateway, MeetingsService],
  controllers: [MeetingsController]
})
export class MeetingsModule { }
