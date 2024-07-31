import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PatientModule } from 'src/patient/patient.module';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { Appointment, AppointmentSchema } from './schema/appointment.schema';

@Module({
  imports: [
    PatientModule,
    MongooseModule.forFeature([
      {
        name: Appointment.name,
        schema: AppointmentSchema,
      },
    ]),
  ],
  providers: [AppointmentService],
  controllers: [AppointmentController],
})
export class AppointmentModule {}
