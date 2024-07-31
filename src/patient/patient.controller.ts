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

import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  registerPatient(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.registerPatient(createPatientDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getPatients() {
    return this.patientService.getPatients();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getPatientById(@Param('id') patientId: string) {
    if (!Types.ObjectId.isValid(patientId)) throw new NotFoundException();

    const patient = this.patientService.getPatientById(patientId);

    if (patient) return patient;
    throw new NotFoundException();
  }
}
