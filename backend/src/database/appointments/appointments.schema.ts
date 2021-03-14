import * as Mongoose from "mongoose";
import statics from "./appointments.statics";

import { IAppointmentDocument, IAppointmentModel } from "./appointments.types";

const AppointmentSchema = new Mongoose.Schema<
  IAppointmentDocument,
  IAppointmentModel
>({
  userId: String,
  date: Number,
});
AppointmentSchema.statics = statics;

export default AppointmentSchema;
