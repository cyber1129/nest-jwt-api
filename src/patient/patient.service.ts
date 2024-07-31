import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Patient, PatientDocument } from './schema/patient.schema';
import { CreatePatientDto } from './dto/create-patient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
  ) {}

  async getPatientById(id: string): Promise<Patient> {
    const patient = await this.patientModel
      .findOne({
        _id: id,
      })
      .exec();

    return patient;
  }

  async getPatients(): Promise<Patient[]> {
    return this.patientModel.find().exec();
  }

  async registerPatient(createPatientDto: CreatePatientDto): Promise<Patient> {
    return this.patientModel.create(createPatientDto);
  }
}
