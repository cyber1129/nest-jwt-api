import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Patient } from 'src/patient/schema/patient.schema';

export type PrescriptionDocument = Prescription & Document;

@Schema()
export class Prescription {
  @Prop({
    required: true,
  })
  medication: string;

  @Prop({
    required: true,
  })
  dosage: string;

  @Prop({
    required: true,
    type: Date,
    default: new Date(),
  })
  prescribed_date: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Patient.name })
  patient_id: Patient;
}

export const PrescriptionSchema = SchemaFactory.createForClass(Prescription);
