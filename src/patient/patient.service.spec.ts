import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { Patient } from './schema/patient.schema';
import { PatientService } from './patient.service';

const mockPatient = {
  _id: '66a9eb39747821231222fc56',
  name: 'dash11',
  age: 30,
  gender: 'Male',
  contact: '555-1234',
  __v: 0,
} as Patient;
const mockPatientId = '66a9eb39747821231222fc56';
const mockAllPatients = [
  {
    _id: '66a9eb39747821231222fc56',
    name: 'dash11',
    age: 30,
    gender: 'Male',
    contact: '555-1234',
    __v: 0,
  },
  {
    _id: '66a9eb3d747821231222fc58',
    name: 'dash11',
    age: 30,
    gender: 'Male',
    contact: '555-1234',
    __v: 0,
  },
];

class MockedPatientModel {
  constructor(private _: any) {}
  static create = jest.fn().mockResolvedValue(mockPatient);
  static findOne = jest.fn().mockReturnValue({ exec: async () => mockPatient });
  static find = jest
    .fn()
    .mockReturnValue({ exec: async () => mockAllPatients });
}

describe('patientService', () => {
  let service: PatientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientService,
        {
          provide: getModelToken(Patient.name),
          useValue: MockedPatientModel,
        },
      ],
    }).compile();

    service = module.get<PatientService>(PatientService);
  });

  it('should get patient by id', async () => {
    const patient = await service.getPatientById(mockPatientId);
    expect(MockedPatientModel.findOne).toHaveBeenCalledTimes(1);
    expect(patient).toEqual(mockPatient);
  });

  it('should get all patients', async () => {
    const patients = await service.getPatients();
    expect(MockedPatientModel.find).toHaveBeenCalledTimes(1);
    expect(patients).toEqual(mockAllPatients);
  });

  it('should register patient', async () => {
    const patient = await service.registerPatient(mockPatient);
    expect(MockedPatientModel.create).toHaveBeenCalledTimes(1);
    expect(patient).toEqual(mockPatient);
  });
});
