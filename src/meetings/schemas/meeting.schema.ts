import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MeetingDocument = Meeting & Document;

@Schema()
export class Meeting {
  @Prop()
  date: number;

  @Prop()
  patientId: string;

  @Prop()
  doctorId: string;

  @Prop()
  reportId: string;

  _id: string;
}

export const MeetingSchema = SchemaFactory.createForClass(Meeting);
