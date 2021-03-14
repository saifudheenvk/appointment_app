import { Document, Model } from "mongoose";
import { ResponseModel } from "../../../types";

export interface IAppointment {
  date: number;
  userId: string;
}

export interface IAppointmentDocument extends IAppointment, Document {}

export interface IAppointmentModel extends Model<IAppointmentDocument> {
  addAppointments: (
    this: IAppointmentModel,
    { userId, date }: { userId: string; date: number }
  ) => Promise<ResponseModel>;
  getAppointmentCount: (
    this: IAppointmentModel,
    date: number
  ) => Promise<number>;
  getTodaysBookings: (
    this: IAppointmentModel,
    date: number
  ) => Promise<ResponseModel>;
}
