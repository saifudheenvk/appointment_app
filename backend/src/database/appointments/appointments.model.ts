import { model } from "mongoose";
import { IAppointmentDocument, IAppointmentModel } from "./appointments.types";
import AppointmentSchema from "./appointments.schema";

const AppointmentModel: IAppointmentModel = model<
  IAppointmentDocument,
  IAppointmentModel
>("appointment", AppointmentSchema);
export default AppointmentModel;
