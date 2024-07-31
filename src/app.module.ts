import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientModule } from './patient/patient.module';
import { AppointmentModule } from './appointment/appointment.module';
import { PrescriptionModule } from './prescription/prescription.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/fabric'),
    UsersModule,
    AuthModule,
    PatientModule,
    AppointmentModule,
    PrescriptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
