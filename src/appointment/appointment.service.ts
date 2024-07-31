import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PatientService } from 'src/patient/patient.service';
import { Appointment, AppointmentDocument } from './schema/appointment.schema';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<AppointmentDocument>,
    private readonly patientService: PatientService,
  ) {}

  async getAppointmentById(id: string): Promise<Appointment> {
    const Appointment = await this.appointmentModel
      .findOne({
        _id: id,
      })
      .exec();

    return Appointment;
  }

  async getAppointments(): Promise<Appointment[]> {
    return this.appointmentModel.find().exec();
  }

  async registerAppointment(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const patient = await this.patientService.getPatientById(
      createAppointmentDto.patientId,
    );

    if (!patient) throw new BadRequestException('Can not find patient');

    return this.appointmentModel.create({
      ...createAppointmentDto,
      appointment_date: new Date(
        createAppointmentDto.appointment_date,
      ).toISOString(),
      patient_id: patient,
    });
  }
}
