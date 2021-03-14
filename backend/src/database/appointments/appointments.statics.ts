import { IAppointmentModel, IAppointmentDocument } from "./appointments.types";
import { ResponseModel } from "../../../types";
import { IUserDocument } from "../users/users.types";
import UserModel from "../users/users.model";

async function addAppointments(
  this: IAppointmentModel,
  { userId, date }: { userId: string; date: number }
): Promise<ResponseModel> {
  const appointmentCount: number = await this.getAppointmentCount(date);
  console.log(appointmentCount > 4);
  if (appointmentCount >= 4) {
    return { data: null, message: "Slot filled." };
  } else {
    const appointment = await this.create({ date, userId });
    return { data: appointment, message: "Success" };
  }
}

async function getAppointmentCount(
  this: IAppointmentModel,
  date: number
): Promise<number> {
  const start = new Date(date);
  start.setHours(0);
  const end = new Date(date);
  end.setHours(24);
  const appointmentCount: number = await this.count({
    date: { $gt: start.getTime(), $lt: end.getTime() },
  });
  return appointmentCount;
}

const getWithUserDetails = (appointments: IAppointmentDocument[]) => {
  const data = appointments.map(async (appointment: IAppointmentDocument) => {
    const user: IUserDocument | null = await UserModel.findById(
      appointment.userId
    );
    if (user)
      return {
        _id: appointment._id,
        name: user.name,
        email: user.email,
        date: appointment.date,
      };
    return appointment;
  });
  return Promise.all(data);
};

async function getTodaysBookings(
  this: IAppointmentModel,
  date: number
): Promise<ResponseModel> {
  const start = new Date(date);
  start.setHours(0);
  const end = new Date(date);
  end.setHours(24);
  const appointments = await this.find({
    date: { $gt: start.getTime(), $lt: end.getTime() },
  });
  const data = await getWithUserDetails(appointments);
  return { data, message: "Success" };
}

export default { addAppointments, getAppointmentCount, getTodaysBookings };
