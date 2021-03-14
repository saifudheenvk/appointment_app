import { Request, Response } from "express";
import AppointmentModel from "../../database/appointments/appointments.model";
import { ResponseModel } from "../../../types";
import { IAppointmentDocument } from "../../database/appointments/appointments.types";
const express = require("express");
const {
  bookingValidation,
  userValidation,
  dateValidation,
} = require("./appointmentValidation");
const verify = require("../auth/verifyToken");
const router = express.Router();

router.get("", verify("ADMIN"), async (req: Request, res: Response) => {
  try {
    const appointments = await AppointmentModel.find();
    res.json(appointments);
  } catch (err) {
    res.statusMessage = err;
    res.send(false);
  }
});

router.get(
  "/today/:date",
  verify("ADMIN"),
  async (req: Request, res: Response) => {
    const date = Number(req.params.date);
    const validated = dateValidation({ date });
    if (validated.error) {
      res.statusMessage = validated.error.details[0].message;
      res.send(false);
    } else {
      try {
        const appointments: ResponseModel = await AppointmentModel.getTodaysBookings(
          date
        );
        res.statusMessage = appointments.message;
        res.send(appointments.data);
      } catch (err) {
        res.statusMessage = err;
        res.send(false);
      }
    }
  }
);

router.get(
  "/mybookings/:id",
  verify("USER"),
  async (req: Request, res: Response) => {
    const validated = userValidation({ userId: req.params.id });
    console.log(validated);
    if (validated.error) {
      res.statusMessage = validated.error.details[0].message;
      res.send(false);
    } else {
      try {
        console.log(req.params.id);
        const appointments: IAppointmentDocument[] = await AppointmentModel.find(
          {
            userId: req.params.id,
          }
        );
        res.send(appointments);
      } catch (err) {
        res.statusMessage = err;
        res.send(false);
      }
    }
  }
);

router.post("", verify("USER"), async (req: Request, res: Response) => {
  const validated = bookingValidation(req.body);
  if (validated.error) {
    res.statusMessage = validated.error.details[0].message;
    res.send(false);
  } else {
    try {
      const appointment: ResponseModel | null = await AppointmentModel.addAppointments(
        req.body
      );
      res.statusMessage = appointment.message;
      res.send(appointment.data);
    } catch (err) {
      res.statusMessage = err;
      res.send(false);
    }
  }
});

router.get(
  "/availability/:date",
  verify("USER"),
  async (req: Request, res: Response) => {
    const date = Number(req.params.date);
    const validated = dateValidation({ date });
    console.log(date);
    if (validated.error) {
      res.statusMessage = validated.error.details[0].message;
      res.send(false);
    } else {
      try {
        const appointmentCount = await AppointmentModel.getAppointmentCount(
          date
        );
        if (appointmentCount >= 4) {
          res.send("Slot filled");
        } else {
          res.send("Slots available");
        }
      } catch (err) {
        res.statusMessage = err;
        res.send(false);
      }
    }
  }
);

module.exports = router;
