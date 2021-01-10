import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { MeetingsService } from './meetings.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { Server } from 'ws';

@WebSocketGateway(8080)
export class MeetingsGateway {
  constructor(private readonly meetingsService: MeetingsService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createMeeting')
  create(@MessageBody() createMeetingDto: CreateMeetingDto) {
    return this.meetingsService.create(createMeetingDto);
  }

  @SubscribeMessage('findAllMeetings')
  findAll() {
    return this.meetingsService.findAll();
  }

  @SubscribeMessage('findOneMeeting')
  findOne(@MessageBody() id: string) {
    return this.meetingsService.findOne(id);
  }

  @SubscribeMessage('updateMeeting')
  update(@MessageBody() updateMeetingDto: UpdateMeetingDto) {
    return this.meetingsService.update(updateMeetingDto._id, updateMeetingDto);
  }

  @SubscribeMessage('removeMeeting')
  remove(@MessageBody() data: {_id: string}) {
    return this.meetingsService.remove(data._id);
  }
}
