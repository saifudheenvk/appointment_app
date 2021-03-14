import express, { Request, Response } from "express";
const userRoutes = require("./routes/users/userRoutes");
const authRoutes = require("./routes/auth/authRoutes");
const appointmentRoutes = require("./routes/appontments/appointmentRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const { connect } = require("./database/database");
require("dotenv/config");
const app: express.Application = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/appointments", appointmentRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("It's a node server");
});

//connect with mong
connect();

//listen at 3001
app.listen(3001, () => {
  console.log("Started booking app");
});
