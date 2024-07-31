import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PatientModule } from 'src/patient/patient.module';
import { PrescriptionController } from './prescription.controller';
import { PrescriptionService } from './prescription.service';
import { Prescription, PrescriptionSchema } from './schema/prescription.schema';

@Module({
  imports: [
    PatientModule,
    MongooseModule.forFeature([
      {
        name: Prescription.name,
        schema: PrescriptionSchema,
      },
    ]),
  ],
  providers: [PrescriptionService],
  controllers: [PrescriptionController],
})
export class PrescriptionModule {}
