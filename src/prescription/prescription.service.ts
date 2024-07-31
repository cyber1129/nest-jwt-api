import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PatientService } from 'src/patient/patient.service';
import {
  Prescription,
  PrescriptionDocument,
} from './schema/prescription.schema';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { GetPrescriptionsDto } from './dto/get-prescriptins.dto';

@Injectable()
export class PrescriptionService {
  constructor(
    @InjectModel(Prescription.name)
    private prescriptionModel: Model<PrescriptionDocument>,
    private readonly patientService: PatientService,
  ) {}

  async getPrescriptionById(id: string): Promise<Prescription> {
    const Prescription = await this.prescriptionModel
      .findOne({
        _id: id,
      })
      .exec();

    return Prescription;
  }

  async getPrescriptions(query?: GetPrescriptionsDto): Promise<Prescription[]> {
    const search: Partial<Prescription> = {};

    if (query.medication) search.medication = query.medication;
    if (query.patientId)
      search.patient_id = await this.patientService.getPatientById(
        query.patientId,
      );

    return this.prescriptionModel.find(search).exec();
  }

  async registerPrescription(
    createPrescriptionDto: Partial<CreatePrescriptionDto>,
  ): Promise<Prescription> {
    const patient = await this.patientService.getPatientById(
      createPrescriptionDto.patientId,
    );

    if (!patient) throw new BadRequestException('Can not find patient');

    return this.prescriptionModel.create({
      ...createPrescriptionDto,
      prescribed_date: new Date(
        createPrescriptionDto.prescribed_date,
      ).toISOString(),
      patient_id: patient,
    });
  }
}
