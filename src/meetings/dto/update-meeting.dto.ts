import { PartialType } from '@nestjs/mapped-types';
import { CreateMeetingDto } from './create-meeting.dto';

export class UpdateMeetingDto extends PartialType(CreateMeetingDto) {
  _id: string;
  date: number;
  patientId: string;
  doctorId: string;
  reportId: string;
}
