import { baseUrl } from "../../constants";
import axios from "../axios";

export default class BookingCalls {
  public static addNewBooking(payload: any) {
    return axios({
      url: `${baseUrl}/appointments`,
      method: "POST",
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public static getMyBookings(id: string | null) {
    return axios({
      url: `${baseUrl}/appointments/mybookings/${id}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public static getTodaysBookings(date: number) {
    return axios({
      url: `${baseUrl}/appointments/today/${date}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public static getTodaysAvailability(date: number) {
    return axios({
      url: `${baseUrl}/appointments/availability/${date}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
