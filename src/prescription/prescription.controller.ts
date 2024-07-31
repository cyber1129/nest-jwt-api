import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Types } from 'mongoose';
import { PrescriptionService } from './prescription.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { GetPrescriptionsDto } from './dto/get-prescriptins.dto';

@Controller('prescriptions')
export class PrescriptionController {
  constructor(private readonly prescriptionService: PrescriptionService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  registerPrescription(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionService.registerPrescription(createPrescriptionDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getPrescriptions(@Query() query: GetPrescriptionsDto) {
    return this.prescriptionService.getPrescriptions(query);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getPrescriptionById(@Param('id') prescriptionId: string) {
    if (!Types.ObjectId.isValid(prescriptionId)) throw new NotFoundException();

    const prescription =
      this.prescriptionService.getPrescriptionById(prescriptionId);

    if (prescription) return prescription;
    throw new NotFoundException();
  }
}
