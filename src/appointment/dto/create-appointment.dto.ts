import { Appointment } from '../schema/appointment.schema';

export class CreateAppointmentDto extends Appointment {
  patientId: string;
}
