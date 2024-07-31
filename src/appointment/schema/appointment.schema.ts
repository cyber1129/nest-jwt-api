import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Patient } from 'src/patient/schema/patient.schema';

export type AppointmentDocument = Appointment & Document;

@Schema()
export class Appointment {
  @Prop({
    required: true,
  })
  doctor: string;

  @Prop({
    required: true,
    type: Date,
    default: new Date(),
  })
  appointment_date: Date;

  @Prop({
    required: true,
  })
  reason: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Patient.name })
  patient_id: Patient;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
