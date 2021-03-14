import React from "react";
import Slot from "../Slot";
import Bookings from "../Bookings";
import NewBooking from "../NewBooking";
export const DashboardConfig = [
  {
    userType: "ADMIN",
    url: "/dashboard/admin",
    component: () => <Bookings />,
  },
  {
    userType: "USER",
    url: "/dashboard/user",
    component: () => <Slot />,
  },
  {
    userType: "USER",
    url: "/dashboard/newbooking",
    component: () => <NewBooking />,
  },
  {
    userType: "USER",
    url: "/dashboard/mybooking",
    component: () => <Bookings />,
  },
];
