import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PatientDocument = Patient & Document;
export type Gender = 'Male' | 'Female';

@Schema()
export class Patient {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  age: number;

  @Prop({
    required: true,
  })
  gender: Gender;

  @Prop({
    required: true,
  })
  contact: string;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
