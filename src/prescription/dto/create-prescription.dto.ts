import { Prescription } from '../schema/prescription.schema';

export class CreatePrescriptionDto extends Prescription {
  patientId: string;
}
