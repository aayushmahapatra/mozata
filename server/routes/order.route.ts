import express from "express";
import { Order } from "../models/order.model";
import isAuthenticated from "../middlewares/authorization.middleware";

const router = express.Router();

// add a new order
router.post("/add", isAuthenticated(), async (req, res) => {
  try {
    const { userId, restaurantId, items, total } = req.body;

    // create a new order
    const newOrder = new Order({
      user: userId,
      restaurant: restaurantId,
      items: items.map(({ dish, quantity }) => ({
        dish,
        quantity,
      })),
      total,
    });

    // save the order to the database
    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error adding order:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
