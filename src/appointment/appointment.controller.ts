import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Types } from 'mongoose';

import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  registerAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.registerAppointment(createAppointmentDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAppointments() {
    return this.appointmentService.getAppointments();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getAppointmentById(@Param('id') AppointmentId: string) {
    if (!Types.ObjectId.isValid(AppointmentId)) throw new NotFoundException();

    const Appointment =
      this.appointmentService.getAppointmentById(AppointmentId);

    if (Appointment) return Appointment;
    throw new NotFoundException();
  }
}
