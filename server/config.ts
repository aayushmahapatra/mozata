import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 8111;
export const MONGODB_URI = process.env.MONGODB_URI;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const SESSION_SECRET_KEY = process.env.SESSION_SECRET_KEY;
export const CORS_ORIGIN = process.env.CORS_ORIGIN;
