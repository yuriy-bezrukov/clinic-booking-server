import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { Meeting, MeetingDocument } from './schemas/meeting.schema';

@Injectable()
export class MeetingsService {

  constructor(
    @InjectModel(Meeting.name) private readonly meetingModel: Model<MeetingDocument>,
  ) { }

  async create(createCatDto: CreateMeetingDto): Promise<Meeting> {
    const createdMeeting = new this.meetingModel(createCatDto);
    return createdMeeting.save().then(meeting => {
      return { event: 'createdMeeting', data: meeting } as any;
    });
  }

  async findAll(): Promise<Meeting[]> {
    return this.meetingModel.find().exec();
  }

  async findOne(_id: string): Promise<Meeting | null> {
    const meetingQuery = await this.meetingModel.findById(_id).exec();
    if (meetingQuery === null) {
      return null;
    }
    const meeting = meetingQuery.toObject();
    return { ...meeting, _id: meeting._id.toString() };
  }

  async update(_id: string, updateMeetingDto: UpdateMeetingDto) {
    const meetingQuery = await this.meetingModel.findByIdAndUpdate(_id, updateMeetingDto, { new: true }).exec();
    if (meetingQuery === null) {
      throw new HttpException({ status: HttpStatus.FORBIDDEN, error: 'Cant update meeting...', }, HttpStatus.FORBIDDEN);
    }
    const meeting = meetingQuery.toObject();
    return { ...meeting, _id: meeting._id.toString() };
  }

  async remove(_id: string) {
    const meetingQuery = await this.meetingModel.findByIdAndDelete(_id).exec();
    if (meetingQuery === null) {
      return null;
    }
    return { event: 'removedMeeting', data: meetingQuery.toObject() } as any;
  }
}
