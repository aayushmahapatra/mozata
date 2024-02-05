// userRoutes.js
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { JWT_SECRET_KEY } from "../config";
import isAuthenticated from "../middlewares/authorization.middleware";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { email, phone, name, password, address } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      phone,
      name,
      password: hashedPassword,
      address,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Signin
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Create and send JWT token
    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET_KEY || "yourSecretKey",
      {
        expiresIn: "1h",
      }
    );
    req.session.token = token;

    res.status(200).json({
      token,
      userId: user._id,
      name: user.name,
      email: user.email,
      ...(user.address && { address: user.address }),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/signout", isAuthenticated(), (req, res) => {
  if (!req.session.token) {
    res.status(200).json({ message: "Already signed out" });
    return;
  }
  req.session.destroy((error: any) => {
    if (error) {
      throw error;
    }
  });
  res.status(200).json({ message: "Signout successful." });
});

export default router;
