import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import { CORS_ORIGIN, MONGODB_URI, PORT, SESSION_SECRET_KEY } from "./config";
import userRoutes from "./routes/user.route";
import restaurantRoutes from "./routes/restaurant.route";
import dishRoutes from "./routes/dish.route";
import orderRoutes from "./routes/order.route";

dotenv.config();

declare module "express-session" {
  export interface SessionData {
    token: string;
  }
}

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(
  session({
    secret: SESSION_SECRET_KEY,
    resave: true,
    saveUninitialized: false,
  })
);

mongoose.connect(MONGODB_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

app.use("/user", userRoutes);
app.use("/restaurant", restaurantRoutes);
app.use("/dish", dishRoutes);
app.use("/order", orderRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
